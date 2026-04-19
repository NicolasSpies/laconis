"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_SECONDS = 90;

type State = "idle" | "recording" | "done";

export function VoiceMemo({
  onChange,
}: {
  onChange?: (blob: Blob | null, seconds: number) => void;
}) {
  const [state, setState] = useState<State>("idle");
  const [seconds, setSeconds] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [levels, setLevels] = useState<number[]>(Array(24).fill(0.05));
  const [error, setError] = useState<string | null>(null);

  const mediaRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stopAll();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopAll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (mediaRef.current && mediaRef.current.state !== "inactive") {
      try {
        mediaRef.current.stop();
      } catch {}
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close().catch(() => {});
    streamRef.current = null;
    audioCtxRef.current = null;
    analyserRef.current = null;
    mediaRef.current = null;
  };

  const start = useCallback(async () => {
    setError(null);
    setBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setSeconds(0);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;

      // audio analyser for live level visualization
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(data);
        // compute a simple rms-ish value
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        setLevels((prev) => {
          const next = prev.slice(1);
          next.push(Math.min(1, rms * 3));
          return next;
        });
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      // recorder
      const rec = new MediaRecorder(stream);
      mediaRef.current = rec;
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const merged = new Blob(chunksRef.current, { type: "audio/webm" });
        setBlob(merged);
        setAudioUrl(URL.createObjectURL(merged));
        setState("done");
        onChange?.(merged, seconds);
      };
      rec.start();
      setState("recording");

      // second-timer
      tickRef.current = window.setInterval(() => {
        setSeconds((s) => {
          const next = s + 1;
          if (next >= MAX_SECONDS) {
            stop();
          }
          return next;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        "mikrofon-zugriff blockiert. check deine browser-einstellungen 🎙️",
      );
      setState("idle");
      stopAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl, onChange]);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (mediaRef.current && mediaRef.current.state === "recording") {
      mediaRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setBlob(null);
    setSeconds(0);
    setLevels(Array(24).fill(0.05));
    setState("idle");
    onChange?.(null, 0);
  };

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(1, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="rounded-xl border border-ink/10 bg-ink/[0.015] p-6 md:p-7">
      <div className="flex items-start gap-3 mb-5">
        <span className="inline-block w-2 h-2 rounded-full bg-lime mt-2" />
        <div>
          <h3 className="heading-sans text-[20px] text-offwhite">
            lieber quatschen als tippen?
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-offwhite/55">
            sprich mir kurz rein — bis zu 90 sekunden. erzähl, was du vorhast.
            ich hör's mir an und melde mich.
          </p>
        </div>
      </div>

      {/* visualizer */}
      <div className="relative rounded-lg bg-black/30 border border-ink/5 p-5 min-h-[120px] flex items-center justify-center">
        {state === "idle" && !blob && (
          <div className="flex flex-col items-center gap-3 py-2">
            <button
              type="button"
              onClick={start}
              className="group relative h-16 w-16 rounded-full bg-lime text-black flex items-center justify-center shadow-[0_10px_30px_rgba(225,253,82,0.25)] hover:shadow-[0_12px_40px_rgba(225,253,82,0.4)] transition-shadow"
            >
              <span className="absolute inset-0 rounded-full bg-lime/30 animate-ping" />
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="relative">
                <rect
                  x="7"
                  y="2"
                  width="8"
                  height="13"
                  rx="4"
                  fill="currentColor"
                />
                <path
                  d="M4 11C4 14.866 7.134 18 11 18M11 18C14.866 18 18 14.866 18 11M11 18V21M7 21H15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
              tippen zum aufnehmen
            </span>
          </div>
        )}

        {state === "recording" && (
          <div className="flex items-center gap-5 w-full">
            <div className="flex items-end gap-1 h-12 flex-1 min-w-0">
              {levels.map((lv, i) => (
                <motion.span
                  key={i}
                  className="flex-1 bg-lime rounded-sm"
                  style={{ minWidth: "2px" }}
                  animate={{ height: `${Math.max(8, lv * 100)}%` }}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="font-mono text-[12px] text-accent-ink tabular-nums">
                {fmt(seconds)} <span className="text-offwhite/30">/ {fmt(MAX_SECONDS)}</span>
              </span>
              <button
                type="button"
                onClick={stop}
                className="h-10 w-10 rounded-full bg-ink/10 hover:bg-ink/20 text-offwhite flex items-center justify-center transition-colors"
                aria-label="stopp"
              >
                <span className="h-3 w-3 rounded-sm bg-lime" />
              </button>
            </div>
          </div>
        )}

        {state === "done" && audioUrl && (
          <div className="w-full space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                ● aufnahme • {fmt(seconds)}
              </span>
              <div className="flex-1 h-px bg-ink/10" />
              <button
                type="button"
                onClick={reset}
                className="font-mono text-[10px] uppercase tracking-label text-offwhite/50 hover:text-accent-ink transition-colors"
              >
                ↻ neu aufnehmen
              </button>
            </div>
            <audio
              controls
              src={audioUrl}
              className="w-full h-10 [&::-webkit-media-controls-panel]:bg-black/60"
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 font-mono text-[11px] text-offwhite/60"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* hidden field so the form submission "knows" */}
      <input
        type="hidden"
        name="voice-memo-seconds"
        value={blob ? seconds : 0}
      />
    </div>
  );
}
