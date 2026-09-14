"use client";

import Image from "next/image";
import { honeymoon } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

/**
 * The honeymoon fund: the bank's QR mounted on ivory, the note beneath it, and
 * the account spelled out for a guest reading this on the phone they would
 * scan with.
 */
export function HoneymoonFund() {
  const t = useCopy();

  return (
    <section id="honeymoon" className="section ground--red">
      <div className="container container--narrow center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">{t.honeymoon.eyebrow}</p>
          <h2 className="heading">{t.honeymoon.heading}</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div className="fund__qr">
            {/* Served as exported (32 KB): the optimiser's re-compression at
                its default quality softens the modules a scanner reads. */}
            <Image
              src={honeymoon.qr}
              alt={`VietQR — ${honeymoon.bank}, ${honeymoon.accountName}`}
              width={900}
              height={900}
              unoptimized
            />
            <p className="fund__bank">{honeymoon.bank}</p>
          </div>
        </Reveal>

        <Reveal delay={200} className="stack-sm">
          <p className="body-text body-text--muted">{t.honeymoon.body}</p>

          <p className="eyebrow">{t.honeymoon.account}</p>
          <p className="stat stat--gold fund__account">{honeymoon.accountNumber}</p>
          <p className="body-text body-text--muted">
            {honeymoon.accountName} · {honeymoon.bank}
          </p>

          {/* What a transfer from abroad needs, set apart from the local
              details above. */}
          <dl className="fund__intl">
            <div>
              <dt className="eyebrow">{t.honeymoon.bankNameEn}</dt>
              <dd className="body-text">{honeymoon.bankNameEn}</dd>
            </div>
            <div>
              <dt className="eyebrow">{t.honeymoon.swift}</dt>
              <dd className="stat stat--gold fund__swift">{honeymoon.swift}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
