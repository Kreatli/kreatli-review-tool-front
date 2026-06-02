import Head from 'next/head';

import { Header } from '../components/layout/Header';
import { useSession } from '../hooks/useSession';

export default function TermsAndConditions() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Terms of Service</title>
      </Head>
      <Header />
      <div className="border-t border-foreground-200 p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Terms of Service</h1>
          <p className="mb-6 text-foreground-500">Last updated June 2, 2026</p>
          <div className="mb-6 rounded-lg border border-foreground-200 bg-foreground-50 p-4 text-sm">
            <span className="font-semibold">Please read carefully:</span> Section 15 contains provisions governing how
            disputes between you and Kreatli, Inc. are resolved, including an agreement to binding arbitration and a
            class action waiver. Unless you opt out within 30 days of first accepting these Terms, you agree to resolve
            disputes through individual arbitration rather than in court, and you waive your right to participate in
            class actions.
          </div>
          <h2 className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">Agreement to our Legal Terms</h2>
          <div className="mt-2">
            We are Kreatli, Inc. ("<span className="font-semibold">Company</span>," "<span className="font-semibold">we</span>
            ," "<span className="font-semibold">us</span>," "<span className="font-semibold">our</span>"), a Delaware
            corporation with its principal office at 131 Continental Dr Suite 305, Newark, Delaware 19713.
          </div>
          <div className="mt-2">
            We operate the website{' '}
            <a
              className="text-primary underline underline-offset-2"
              href="https://kreatli.com"
              target="_blank"
              data-custom-class="link"
            >
              https://kreatli.com
            </a>{' '}
            (the "<span className="font-semibold">Site</span>"), as well as any other related products and services that
            refer or link to these legal terms (the "<span className="font-semibold">Legal Terms</span>") (collectively,
            the "<span className="font-semibold">Services</span>").
          </div>
          <div className="mt-2">
            Kreatli is an end-to-end production management platform for Creative Teams. It brings all your projects,
            communication, and files into one organized space, helping you manage your workflow with features like
            intuitive file organization, live collaboration tools, and powerful storage solutions.
          </div>
          <div className="mt-2">
            You can contact us by emailing at{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>
            .
          </div>
          <div className="mt-2">
            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf
            of an entity ("<span className="font-semibold">you</span>"), and Kreatli, Inc., concerning your access to and use
            of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound
            by all of these Legal Terms. If you do not agree with all of these Legal Terms, then you are expressly
            prohibited from using the Services and you must discontinue use immediately.
          </div>
          <div className="mt-2">
            We will provide you with prior notice of any scheduled changes to the Services you are using. By continuing
            to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
          </div>
          <div className="mt-2">
            The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not
            permitted to use or register for the Services.
          </div>
          <div className="mt-2">We recommend that you print a copy of these Legal Terms for your records.</div>
          <div data-custom-class="heading_1">
            <h2 className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">Table of Contents</h2>
          </div>
          <ul className="mt-2 list-inside list-decimal pl-2">
            <li>
              <a className="text-primary underline underline-offset-2" href="#services">
                Our Services
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#ip" data-custom-class="link">
                Intellectual Property Rights
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#userreps" data-custom-class="link">
                User Representations
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#userreg" data-custom-class="link">
                User Registration
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#purchases" data-custom-class="link">
                Purchases and Payment
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#subscriptions" data-custom-class="link">
                Subscriptions
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#prohibited" data-custom-class="link">
                Prohibited Activities
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#ugc" data-custom-class="link">
                User Generated Contributions
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#license" data-custom-class="link">
                Customer Content License
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#sitemanage" data-custom-class="link">
                Services Management
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#ppyes" data-custom-class="link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#terms" data-custom-class="link">
                Term and Termination
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#modifications" data-custom-class="link">
                Modifications and Interruptions
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#law" data-custom-class="link">
                Governing Law
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#disputes" data-custom-class="link">
                Dispute Resolution
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#corrections" data-custom-class="link">
                Corrections
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#disclaimer" data-custom-class="link">
                Disclaimer
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#liability" data-custom-class="link">
                Limitations of Liability
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#indemnification" data-custom-class="link">
                Indemnification
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#userdata" data-custom-class="link">
                User Data
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#electronic" data-custom-class="link">
                Electronic Communications, Transactions, and Signatures
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#dmca" data-custom-class="link">
                Copyright Policy (DMCA)
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#california" data-custom-class="link">
                California Users and Residents
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#misc" data-custom-class="link">
                Miscellaneous
              </a>
            </li>
            <li>
              <a className="text-primary underline underline-offset-2" href="#contact" data-custom-class="link">
                Contact Us
              </a>
            </li>
          </ul>
          <div data-custom-class="heading_1">
            <h2 id="services" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              1. Our Services
            </h2>
          </div>
          <div className="mt-2">
            The information provided when using the Services is not intended for distribution to or use by any person or
            entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation
            or which would subject us to any registration requirement within such jurisdiction or country. Accordingly,
            those persons who choose to access the Services from other locations do so on their own initiative and are
            solely responsible for compliance with local laws, if and to the extent local laws are applicable.
          </div>
          <div className="mt-2">
            The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and
            Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your
            interactions would be subjected to such laws, you may not use the Services. You may not use the Services in
            a way that would violate the Gramm-Leach-Bliley Act (GLBA).
          </div>
          <h2 id="ip" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            2. Intellectual Property Rights
          </h2>
          <div data-custom-class="heading_2">
            <h3 className="mb-1 mt-4 text-xl font-semibold">Our intellectual property</h3>
          </div>
          <div className="mt-2">
            We are the owner or the licensee of all intellectual property rights in our Services, including all source
            code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in
            the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained
            therein (the "Marks").
          </div>
          <div className="mt-2">
            Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property
            rights and unfair competition laws) and treaties in the United States and around the world.
          </div>
          <div className="mt-2">
            The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use
            or internal business purpose only.
          </div>
          <div data-custom-class="heading_2">
            <h3 className="mb-1 mt-4 text-xl font-semibold">Your use of our Services</h3>
          </div>
          <div className="mt-2">
            Subject to your compliance with these Legal Terms, including the{' '}
            <a className="text-primary underline underline-offset-2" href="#prohibited" data-custom-class="link">
              Prohibited Activities
            </a>{' '}
            section below, we grant you a non-exclusive, non-transferable, revocable license to:
          </div>
          <ul className="mt-2 list-inside list-disc pl-2">
            <li>access the Services; and</li>
            <li>
              download or print a copy of any portion of the Content to which you have properly gained access, solely
              for your personal, non-commercial use or internal business purpose.
            </li>
          </ul>
          <div className="mt-2">
            Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or
            Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded,
            translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose
            whatsoever, without our express prior written permission.
          </div>
          <div className="mt-2">
            If you wish to make any use of the Services, Content, or Marks other than as set out in this section or
            elsewhere in our Legal Terms, please address your request to{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>
            . If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or
            Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that
            any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our
            Content.
          </div>
          <div className="mt-2">
            We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
          </div>
          <div className="mt-2">
            Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and
            your right to use our Services will terminate immediately.
          </div>
          <div data-custom-class="heading_2">
            <h3 className="mb-1 mt-4 text-xl font-semibold">Your Customer Content</h3>
          </div>
          <div className="mt-2">
            Please review this section carefully to understand (a) your ownership of content you upload or create
            through the Services, (b) the limited rights you grant us to operate the Services, and (c) your obligations
            when using the Services.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Your Content is Your Content.</span> As between you and Kreatli, you retain
            all right, title, and interest in and to any files, designs, projects, images, videos, documents, or other
            materials you upload or create through the Services (&ldquo;
            <span className="font-semibold">Customer Content</span>&rdquo;). Kreatli does not claim any ownership
            rights over your Customer Content, and nothing in these Legal Terms transfers any intellectual property
            rights in your Customer Content to Kreatli.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Limited License to Operate the Services.</span> You grant Kreatli a
            limited, non-exclusive, worldwide, royalty-free license to host, store, copy, transmit, cache, and display
            your Customer Content solely to the extent necessary to provide the Services to you and your authorized
            collaborators. Kreatli will not use your Customer Content for any commercial purpose beyond the operation of
            the Services, and Kreatli has no right to sell, sublicense, or otherwise commercially exploit your Customer
            Content to any third party.
          </div>
          <div className="mt-2">
            <span className="font-semibold">No Sale of Customer Content.</span>{' '}
            <span className="font-semibold">
              Kreatli will never sell your Customer Content or provide it to any third party for commercial
              exploitation. Your Customer Content is used exclusively to provide and improve the Services for you.
            </span>{' '}
            We expressly disclaim any right, title, or interest to sell, resell, license, or otherwise transfer your
            Customer Content to third parties for any commercial purpose.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Feedback.</span> If you directly send us any question, comment, suggestion,
            idea, or feedback about the Services (&ldquo;<span className="font-semibold">Feedback</span>&rdquo;), you
            agree that we may use such Feedback to improve the Services without any obligation to you. Feedback is
            distinct from your Customer Content and does not include the files or creative materials you store or create
            in the Services.
          </div>
          <div className="mt-2">
            <span className="font-semibold">You are responsible for what you upload:</span> By uploading or sharing
            Customer Content through the Services, you:
          </div>
          <ul className="mt-2 list-inside list-disc pl-2">
            <li>
              confirm that you have read and agree with our{' '}
              <a className="text-primary underline underline-offset-2" href="#prohibited" data-custom-class="link">
                Prohibited Activities
              </a>{' '}
              and will not upload, transmit, or share through the Services any content that is illegal, harassing,
              hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or
              group, sexually explicit, false, inaccurate, deceitful, or misleading;
            </li>
            <li>
              warrant that your Customer Content is original to you or that you have the necessary rights, licenses,
              consents, and permissions to upload it and grant us the limited operational license described above;
            </li>
            <li>
              warrant that your Customer Content does not infringe the intellectual property rights, privacy rights, or
              other rights of any third party; and
            </li>
            <li>
              acknowledge that you are solely responsible for your Customer Content and agree to indemnify us for any
              losses arising from your breach of the representations in this section.
            </li>
          </ul>
          <div className="mt-2">
            <span className="font-semibold">We may remove your Content:</span> Although we have no obligation to
            monitor any Customer Content, we reserve the right to remove or disable access to any Customer Content at
            any time without notice if in our reasonable opinion we consider such content harmful or in breach of these
            Legal Terms. If we remove or disable any such content, we may also suspend or disable your account and
            report you to the authorities.
          </div>
          <h2 id="userreps" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            3. User Representations
          </h2>
          <div className="mt-2">
            By using the Services, you represent and warrant that: (1) all registration information you submit will be
            true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly
            update such registration information as necessary;&nbsp;(3) you have the legal capacity and you agree to
            comply with these Legal Terms;&nbsp;(4) you are not a minor in the jurisdiction in which you reside; (5) you
            will not access the Services through automated or non-human means, whether through a bot, script or
            otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and (7) your use of
            the Services will not violate any applicable law or regulation.
          </div>
          <div className="mt-2">
            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to
            suspend or terminate your account and refuse any and all current or future use of the Services (or any
            portion thereof).
          </div>
          <div data-custom-class="heading_1">
            <h2 id="userreg" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              4. User Registration
            </h2>
          </div>
          <div className="mt-2">
            You may be required to register to use the Services. You agree to keep your password confidential and will
            be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change
            a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene,
            or otherwise objectionable.
          </div>
          <h2 id="purchases" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            5. Purchases and Payment
          </h2>
          <div className="mt-2">We accept the following forms of payment:</div>
          <ul className="mt-2 list-inside list-disc">
            <li>Visa</li>
            <li>Mastercard</li>
            <li>American Express</li>
            <li>Discover</li>
          </ul>
          <div className="mt-2">
            You agree to provide current, complete, and accurate purchase and account information for all purchases made
            via the Services. You further agree to promptly update account and payment information, including email
            address, payment method, and payment card expiration date, so that we can complete your transactions and
            contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may
            change prices at any time. All payments shall be&nbsp;in US dollars.
          </div>
          <div className="mt-2">
            You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping
            fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your
            order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested
            or received payment.
          </div>
          <div className="mt-2">
            We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit
            or cancel quantities purchased per person, per household, or per order. These restrictions may include
            orders placed by or under the same customer account, the same payment method, and/or orders that use the
            same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole
            judgment, appear to be placed by dealers, resellers, or distributors.
          </div>
          <h2 id="subscriptions" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            6. Subscriptions
          </h2>
          <h3 className="mb-1 mt-4 text-xl font-semibold">Billing and Renewal</h3>
          <div className="mt-2">
            Your subscription will continue and automatically renew unless canceled. You consent to our charging your
            payment method on a recurring basis without requiring your prior approval for each recurring charge, until
            such time as you cancel the applicable order. The length of your billing cycle is monthly.
          </div>
          <h3 className="mb-1 mt-4 text-xl font-semibold">Cancellation</h3>
          <div className="mt-2">
            You can cancel your subscription at any time by logging into your account. Your cancellation will take
            effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services,
            please email us at{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>
            .
          </div>
          <h3 className="mb-1 mt-4 text-xl font-semibold">Fee Changes</h3>
          We may, from time to time, make changes to the subscription fee and will communicate any price changes to you
          in accordance with applicable law.
          <h2 id="prohibited" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            7. Prohibited Activities
          </h2>
          <div className="mt-2">
            You may not access or use the Services for any purpose other than that for which we make the Services
            available. The Services may not be used in connection with any commercial endeavors except those that are
            specifically endorsed or approved by us.
          </div>
          <div className="mt-2">As a user of the Services, you agree not to:</div>
          <ul className="mt-2 list-inside list-disc pl-2">
            <li>
              Systematically retrieve data or other content from the Services to create or compile, directly or
              indirectly, a collection, compilation, database, or directory without written permission from us.
            </li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
              information such as user passwords.
            </li>
            <li>
              Circumvent, disable, or otherwise interfere with security-related features of the Services, including
              features that prevent or restrict the use or copying of any Content or enforce limitations on the use of
              the Services and/or the Content contained therein.
            </li>
            <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
            <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
            <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
            <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
            <li>Engage in unauthorized framing of or linking to the Services.</li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material,
              including excessive use of capital letters and spamming (continuous posting of repetitive text), that
              interferes with any party&rsquo;s uninterrupted use and enjoyment of the Services or modifies, impairs,
              disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the
              Services.
            </li>
            <li>
              Engage in any automated use of the system, such as using scripts to send comments or messages, or using
              any data mining, robots, or similar data gathering and extraction tools.
            </li>
            <li>Delete the copyright or other proprietary rights notice from any Content.</li>
            <li>Attempt to impersonate another user or person or use the username of another user.</li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active
              information collection or transmission mechanism, including without limitation, clear graphics interchange
              formats ("gifs"), 1&times;1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as
              "spyware" or "passive collection mechanisms" or "pcms").
            </li>
            <li>
              Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected
              to the Services.
            </li>
            <li>
              Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of
              the Services to you.
            </li>
            <li>
              Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or
              any portion of the Services.
            </li>
            <li>
              Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other
              code.
            </li>
            <li>
              Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the
              software comprising or in any way making up a part of the Services.
            </li>
            <li>
              Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or
              distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper,
              or offline reader that accesses the Services, or use or launch any unauthorized script or other software.
            </li>
            <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
            <li>
              Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users
              by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by
              automated means or under false pretenses.
            </li>
            <li>
              Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content
              for any revenue-generating endeavor or commercial enterprise.
            </li>
          </ul>
          <h2 id="ugc" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            8. User Generated Contributions
          </h2>
          <div className="mt-2">
            The Services may provide you with the opportunity to create, submit, post, display, transmit, publish,
            distribute, or broadcast content and materials to us or on the Services, including but not limited to text,
            writings, video, audio, photographs, graphics, comments, suggestions, or other material (collectively,
            &ldquo;<span className="font-semibold">Contributions</span>&rdquo;). Contributions may be viewable by other
            authorized users of the Services. As stated in Section 9 below, you retain ownership of your Contributions
            and Customer Content at all times. When you create or make available any Contributions, you represent and
            warrant that:
          </div>
          <ul className="mt-2 list-inside list-disc pl-2">
            <li>
              The creation, distribution, transmission, public display, or performance, and the accessing, downloading,
              or copying of your Contributions do not and will not infringe the proprietary rights, including but not
              limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
            </li>
            <li>
              You are the creator and owner of or have the necessary licenses, rights, consents, releases, and
              permissions to use and to authorize us, the Services, and other users of the Services to use your
              Contributions in any manner contemplated by the Services and these Legal Terms.
            </li>
            <li>
              You have the written consent, release, and/or permission of each and every identifiable individual person
              in your Contributions to use the name or likeness of each and every such identifiable individual person to
              enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal
              Terms.
            </li>
            <li>Your Contributions are not false, inaccurate, or misleading.&nbsp;</li>
            <li>
              Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid
              schemes, chain letters, spam, mass mailings, or other forms of solicitation.
            </li>
            <li>
              Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or
              otherwise objectionable (as determined by us).
            </li>
            <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
            <li>
              Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person
              and to promote violence against a specific person or class of people.
            </li>
            <li>Your Contributions do not violate any applicable law, regulation, or rule.&nbsp;</li>
            <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
            <li>
              Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended
              to protect the health or well-being of minors.
            </li>
            <li>
              Your Contributions do not include any offensive comments that are connected to race, national origin,
              gender, sexual preference, or physical handicap.
            </li>
            <li>
              Your Contributions do not otherwise violate, or link to material that violates, any provision of these
              Legal Terms, or any applicable law or regulation.
            </li>
          </ul>
          <div className="mt-2">
            Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among
            other things, termination or suspension of your rights to use the Services.
          </div>
          <h2 id="license" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            9. Customer Content License
          </h2>
          <div className="mt-2">
            <span className="font-semibold">You own your Customer Content.</span> Kreatli does not claim ownership of
            any Customer Content you upload or create through the Services. You retain full ownership of all Customer
            Content and all intellectual property rights and other proprietary rights associated with it.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Limited operational license.</span> By uploading or creating Customer
            Content through the Services, you grant Kreatli a limited, non-exclusive, worldwide, royalty-free license
            to host, store, cache, copy, transmit, and display your Customer Content solely as necessary to provide and
            maintain the Services for you and your authorized collaborators. This license does not permit Kreatli to use
            your Customer Content for any other purpose, and expressly excludes any right to sell, resell, sublicense,
            rent, lease, transfer, or otherwise commercially exploit your Customer Content to any third party.
          </div>
          <div className="mt-2">
            <span className="font-semibold">No commercial exploitation of your content.</span>{' '}
            <span className="font-semibold">
              Kreatli will not sell, license, or otherwise transfer your Customer Content to third parties for
              commercial gain. We will not use your Customer Content for advertising, marketing, or any purpose outside
              the direct operation of the Services.
            </span>{' '}
            We will process your Customer Content only in accordance with our{' '}
            <a href="/privacy-policy" target="_blank" className="text-primary underline underline-offset-2">
              Privacy Policy
            </a>{' '}
            and applicable law.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Termination and data return.</span> Upon termination of your account, we
            will make your Customer Content available for export or download for a period of thirty (30) days following
            termination, after which we may delete it from our systems. We are not liable for any loss of Customer
            Content resulting from termination if you did not export it within that period.
          </div>
          <div className="mt-2">
            We have the right, in our sole and absolute discretion, (1) to re-categorize any Customer Content to place
            it in more appropriate locations on the Services; and (2) to pre-screen or delete any Customer Content that
            violates these Legal Terms at any time and for any reason, without notice. We have no obligation to monitor
            your Customer Content.
          </div>
          <h2 id="sitemanage" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            10. Services Management
          </h2>
          <div className="mt-2">
            We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal
            Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or
            these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in
            our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or
            disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in
            our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise
            disable all files and content that are excessive in size or are in any way burdensome to our systems; and
            (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate
            the proper functioning of the Services.
          </div>
          <h2 id="ppyes" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            11. Privacy Policy
          </h2>
          <div className="mt-2">
            We care about data privacy and security. Please review our Privacy Policy:{' '}
            <a href="/privacy-policy" target="_blank" className="text-primary underline underline-offset-2">
              https://kreatli.com/privacy-policy
            </a>
            . By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal
            Terms. Please be advised the Services are hosted in the United States. If you access the Services from any
            other region of the world with laws or other requirements governing personal data collection, use, or
            disclosure that differ from applicable laws in the United States, then through your continued use of the
            Services, you are transferring your data to the United States, and you expressly consent to have your data
            transferred to and processed in the United States.
          </div>
          <h2 id="terms" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            12. Term and Termination
          </h2>
          <div className="mt-2">
            These Legal Terms shall remain in full force and effect while you use the Services. Without limiting any
            other provision of these Legal Terms, we reserve the right, in our sole discretion and without notice or
            liability, to deny access to and use of the Services (including blocking certain IP addresses), to any
            person for any reason or for no reason, including without limitation for breach of any representation,
            warranty, or covenant contained in these Legal Terms or of any applicable law or regulation. We may
            terminate your use or participation in the Services or delete your account and any content or information
            that you posted at any time, without warning, in our sole discretion.
          </div>
          <div className="mt-2">
            If we terminate or suspend your account for any reason, you are prohibited from registering and creating a
            new account under your name, a fake or borrowed name, or the name of any third party, even if you may be
            acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the
            right to take appropriate legal action, including without limitation pursuing civil, criminal, and
            injunctive redress.
          </div>
          <h2 id="modifications" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            13. Modifications and Interruptions
          </h2>
          <div className="mt-2">
            We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason
            at our sole discretion without notice. However, we have no obligation to update any information on our
            Services. We will not be liable to you or any third party for any modification, price change, suspension, or
            discontinuance of the Services.
          </div>
          <div className="mt-2">
            We cannot guarantee the Services will be available at all times. We may experience hardware, software, or
            other problems or need to perform maintenance related to the Services, resulting in interruptions, delays,
            or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the
            Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever
            for any loss, damage, or inconvenience caused by your inability to access or use the Services during any
            downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to
            maintain and support the Services or to supply any corrections, updates, or releases in connection
            therewith.
          </div>
          <h2 id="law" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            14. Governing Law
          </h2>
          <div className="mt-2">
            These Legal Terms are governed by and construed in accordance with the laws of the State of Delaware,
            without regard to its conflict of law principles. The use of the United Nations Convention of Contracts for
            the International Sales of Goods is expressly excluded. To the extent that any dispute is not subject to
            arbitration as set forth in Section 15, you and Kreatli agree to submit to the exclusive jurisdiction of
            the state and federal courts located in the State of Delaware for resolution of any such dispute.
          </div>
          <h2 id="disputes" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
            15. Dispute Resolution
          </h2>
          <div className="mt-2">
            <span className="font-semibold">Informal Resolution.</span> Before initiating any formal dispute, you agree
            to contact us at{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>{' '}
            and attempt to resolve the issue informally. We will try to resolve the dispute within thirty (30) days of
            receiving your notice.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Binding Arbitration.</span> EXCEPT FOR DISPUTES THAT QUALIFY FOR SMALL
            CLAIMS COURT, ALL DISPUTES ARISING OUT OF OR RELATED TO THESE LEGAL TERMS OR THE SERVICES WILL BE RESOLVED
            THROUGH BINDING INDIVIDUAL ARBITRATION ADMINISTERED BY JAMS IN ACCORDANCE WITH ITS STREAMLINED ARBITRATION
            RULES AND PROCEDURES. THE ARBITRATION WILL BE CONDUCTED IN ENGLISH. THE ARBITRATOR&rsquo;S AWARD SHALL BE
            FINAL AND BINDING AND MAY BE ENTERED AS A JUDGMENT IN ANY COURT OF COMPETENT JURISDICTION. BY AGREEING TO
            THESE LEGAL TERMS, YOU ARE WAIVING YOUR RIGHT TO A TRIAL BY JURY AND YOUR RIGHT TO PARTICIPATE IN A CLASS
            ACTION LAWSUIT.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Class Action Waiver.</span> ALL CLAIMS MUST BE BROUGHT IN THE PARTIES&rsquo;
            INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
            PROCEEDING. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON&rsquo;S CLAIMS, AND MAY NOT OTHERWISE
            PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING.
          </div>
          <div className="mt-2">
            <span className="font-semibold">30-Day Right to Opt Out.</span> You have the right to opt out of the
            binding arbitration provisions above by sending a written notice of your decision to opt out to the
            following address: 131 Continental Dr Suite 305, Newark, Delaware 19713, or by email to{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>
            , within thirty (30) days after first becoming subject to these Legal Terms. Your notice must include your
            name and address and a clear statement that you want to opt out of this arbitration agreement. If you opt
            out, all other parts of these Legal Terms will continue to apply to you.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Exceptions.</span> Nothing in this section shall limit either party&rsquo;s
            right to seek injunctive or other equitable relief from a court for matters relating to data security,
            intellectual property, or unauthorized access to the Services.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="corrections" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              16. Corrections
            </h2>
          </div>
          <div className="mt-2">
            There may be information on the Services that contains typographical errors, inaccuracies, or omissions,
            including descriptions, pricing, availability, and various other information. We reserve the right to
            correct any errors, inaccuracies, or omissions and to change or update the information on the Services at
            any time, without prior notice.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="disclaimer" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              17. Disclaimer
            </h2>
          </div>
          <div className="mt-2">
            The Services are provided on an AS-IS and AS-AVAILABLE basis. You agree that your use of the Services will
            be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or
            implied, in connection with the Services and your use thereof, including, without limitation, the implied
            warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranties
            or representations about the accuracy or completeness of the Services' content or the content of any
            websites or mobile applications linked to the Services and we will assume no liability or responsibility for
            any (1) errors, mistakes, or inaccuracies of content and materials, (2) personal injury or property damage,
            of any nature, whatsoever, whatsoever, resulting from your access to and use of the Services, (3) any
            unauthorized access to or use of our secure servers and/or any and all personal information and/or financial
            information stored therein, (4) an interruption or cessation of transmission to or from the Services, (5)
            any bugs, viruses, trojan horses, or the like which may be transmitted to or through the Services by any
            third party, and/or (6) any errors or omissions in any content and materials or for any loss or damage of
            any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via
            the Services. We do not warrant, endorse, guarantee, or assume responsibility for any product or service
            advertised or offered by a third party through the Services, any hyperlinked website, or any website or
            mobile application featured in any banner or other advertising, and we will not be a party to or in any way
            be responsible for monitoring any transaction between you and any third-party providers of products or
            services. As with the purchase of a product or service through any medium or in any environment, you should
            use your best judgment and exercise caution where appropriate.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="liability" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              18. Limitations of Liability
            </h2>
          </div>
          <div>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any
            direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit,
            lost revenue, loss of data, or other damages arising from your use of the Services, even if we have been
            advised of the possibility of such damages. Notwithstanding anything to the contrary contained herein, our
            liability to you for any cause whatsoever and regardless of the form of the action, will at all times be
            limited to the amount paid, if any, by you to us during the three (3) month period prior to any cause of
            action arising. Certain US state laws and international laws do not allow limitations on implied warranties
            or the exclusion or limitation of certain damages. If these laws apply to you, some or all of the above
            disclaimers or limitations may not apply to you, and you may have additional rights.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="indemnification" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              19. Indemnification
            </h2>
          </div>
          <div className="mt-2">
            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our
            respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim,
            or demand, including reasonable attorneys&rsquo; fees and expenses, made by any third party due to or
            arising out of: (1) your Contributions;&nbsp;(2) use of the Services; (3) breach of these Legal Terms; (4)
            any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the
            rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful
            act toward any other user of the Services with whom you connected via the Services. Notwithstanding the
            foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter
            for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of
            such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is
            subject to this indemnification upon becoming aware of it.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="userdata" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              20. User Data
            </h2>
          </div>
          <div className="mt-2">
            We will maintain certain data that you transmit to the Services for the purpose of managing the performance
            of the Services, as well as data relating to your use of the Services. Although we perform regular routine
            backups of data, you are solely responsible for all data that you transmit or that relates to any activity
            you have undertaken using the Services. You agree that we shall have no liability to you for any loss or
            corruption of any such data, and you hereby waive any right of action against us arising from any such loss
            or corruption of such data.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="electronic" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              21. Electronic Communications, Transactions, and Signatures
            </h2>
          </div>
          <div className="mt-2">
            Visiting the Services, sending us emails, and completing online forms constitute electronic communications.
            You consent to receive electronic communications, and you agree that all agreements, notices, disclosures,
            and other communications we provide to you electronically, via email and on the Services, satisfy any legal
            requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
            CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF
            TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements
            under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an
            original signature or delivery or retention of non-electronic records, or to payments or the granting of
            credits by any means other than electronic means.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="dmca" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              22. Copyright Policy (DMCA)
            </h2>
          </div>
          <div className="mt-2">
            Kreatli respects the intellectual property rights of others and expects users of the Services to do the
            same. In accordance with the Digital Millennium Copyright Act (&ldquo;<span className="font-semibold">DMCA</span>
            &rdquo;), we will respond to notices of alleged copyright infringement that comply with applicable law and
            are properly provided to us.
          </div>
          <div className="mt-2">
            If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement
            and is accessible through the Services, please notify our designated copyright agent by providing all of
            the following information:
          </div>
          <ul className="mt-2 list-inside list-disc pl-2">
            <li>A physical or electronic signature of the copyright owner or authorized agent;</li>
            <li>Identification of the copyrighted work claimed to have been infringed;</li>
            <li>
              Identification of the material that is claimed to be infringing and information reasonably sufficient to
              permit us to locate the material on the Services;
            </li>
            <li>
              Your contact information, including address, telephone number, and email address;
            </li>
            <li>
              A statement that you have a good faith belief that the use of the material is not authorized by the
              copyright owner, its agent, or applicable law; and
            </li>
            <li>
              A statement, made under penalty of perjury, that the information in your notification is accurate and
              that you are the copyright owner or authorized to act on behalf of the copyright owner.
            </li>
          </ul>
          <div className="mt-2">
            Our designated copyright agent for notice of alleged copyright infringement is:
          </div>
          <div className="mt-2 pl-4">
            <div>Kreatli, Inc.</div>
            <div>Attn: Copyright Agent</div>
            <div>131 Continental Dr Suite 305</div>
            <div>Newark, Delaware 19713</div>
            <div>
              Email:{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>
            </div>
          </div>
          <div className="mt-2">
            We will disable and remove access to content claimed to be infringing upon receiving a valid DMCA notice,
            and will terminate the accounts of repeat infringers in appropriate circumstances.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="california" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              23. California Users and Residents
            </h2>
          </div>
          <div className="mt-2">
            If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of
            the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North
            Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="misc" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              24. Miscellaneous
            </h2>
          </div>
          <div className="mt-2">
            These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the
            Services constitute the entire agreement and understanding between you and us. Our failure to exercise or
            enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or
            provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of
            our rights and obligations to others at any time. We shall not be responsible or liable for any loss,
            damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part
            of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or
            part of the provision is deemed severable from these Legal Terms and does not affect the validity and
            enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency
            relationship created between you and us as a result of these Legal Terms or use of the Services. You agree
            that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive
            any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing
            by the parties hereto to execute these Legal Terms.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="contact" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              25. Contact Us
            </h2>
          </div>
          <div className="mt-2">
            In order to resolve a complaint regarding the Services or to receive further information regarding use of
            the Services, please contact us at:
          </div>
          <div className="mt-2 pl-4">
            <div>
              <span className="font-semibold">Kreatli, Inc.</span>
            </div>
            <div>131 Continental Dr Suite 305</div>
            <div>Newark, Delaware 19713</div>
            <div>
              Email:{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
