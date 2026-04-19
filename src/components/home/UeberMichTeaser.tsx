"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";

export function UeberMichTeaser() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="03">über mich</SectionLabel>

        <div className="mt-10 grid md:grid-cols-[minmax(0,380px)_1fr] gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="md:sticky md:top-28"
          >
            <Placeholder
              label="føto • kommt"
              aspect="3/4"
              className="rounded-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <blockquote className="heading-display text-[clamp(1.75rem,4vw,3rem)] text-offwhite">
              Hinter lacønis <br />
              stecke nur ich. <br />
              <span className="text-accent-ink">Und ich nehme das persönlich.</span>
            </blockquote>

            <div className="mt-8 max-w-[560px] space-y-5 text-[15px] text-offwhite/60 leading-relaxed">
              <p>
                Jedes Projekt wird aus zwei Perspektiven betrachtet • deiner
                und der deiner Kunden. Die wichtigste Frage dabei: Was soll bei
                deinen Kunden ankommen?
              </p>
              <p>
                Perfect imperfection • keine sterilen Websites. Dinge, die nach
                jemandem aussehen.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              <Tag highlight>perfect imperfection</Tag>
              <Tag>mediengestalter</Tag>
              <Tag>eupen • belgien</Tag>
              <Tag>de • fr • en</Tag>
            </div>

            <div className="mt-10">
              <Button href="/ueber-mich" variant="glass" size="md">
                mehr über mich →
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
