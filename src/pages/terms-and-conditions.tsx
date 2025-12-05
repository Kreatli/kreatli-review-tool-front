import Head from 'next/head';
import { useSession } from '../hooks/useSession';
import { Header } from '../components/layout/Header';

export default function TermsAndConditions() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Terms and Conditions</title>
      </Head>
      <Header />
      <div className="border-t border-foreground-200 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-sans font-bold">Terms of Service</h1>
          <p className="text-foreground-500 mb-6">Last updated July 21, 2025</p>
          <h2 className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">Agreement to our Legal Terms</h2>
          <div className="mt-2">
            We are Kreatli ("<span className="font-semibold">Company</span>," "<span className="font-semibold">we</span>
            ," "<span className="font-semibold">us</span>," "<span className="font-semibold">our</span>"), a company
            registered in Germany at Sch&ouml;nflie&szlig;er Str. 2, Berlin 10439.
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
            of an entity ("<span className="font-semibold">you</span>"), and Kreatli, concerning your access to and use
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
            <h2 className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">Table of Contents</h2>
          </div>
          <ul className="list-decimal list-inside mt-2 pl-2">
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
                Contribution License
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
            <h2 id="services" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
          <h2 id="ip" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            2. Intellectual Property Rights
          </h2>
          <div data-custom-class="heading_2">
            <h3 className="text-xl font-semibold mt-4 mb-1">Our intellectual property</h3>
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
            <h3 className="text-xl font-semibold mt-4 mb-1">Your use of our Services</h3>
          </div>
          <div className="mt-2">
            Subject to your compliance with these Legal Terms, including the{' '}
            <a className="text-primary underline underline-offset-2" href="#prohibited" data-custom-class="link">
              Prohibited Activities
            </a>{' '}
            section below, we grant you a non-exclusive, non-transferable, revocable license to:
          </div>
          <ul className="list-disc list-inside mt-2 pl-2">
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
            <h3 className="text-xl font-semibold mt-4 mb-1">Your submissions and contributions</h3>
          </div>
          <div className="mt-2">
            Please review this section and the{' '}
            <a className="text-primary underline underline-offset-2" href="#prohibited" data-custom-class="link">
              Prohibited Activities
            </a>{' '}
            section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations
            you have when you post or upload any content through the Services.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Submissions:</span> By directly sending us any question, comment,
            suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to
            us all intellectual property rights in such Submission. You agree that we shall own this Submission and be
            entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without
            acknowledgment or compensation to you.
          </div>
          <div className="mt-2">
            <span className="font-semibold">Contributions:</span> The Services may invite you to chat, contribute to, or
            participate in blogs, message boards, online forums, and other functionality during which you may create,
            submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through
            the Services, including but not limited to text, writings, video, audio, photographs, music, graphics,
            comments, reviews, rating suggestions, personal information, or other material ("Contributions"). Any
            Submission that is publicly posted shall also be treated as a Contribution.
          </div>
          <div className="mt-2">You understand that Contributions may be viewable by other users of the Services.</div>
          <div className="mt-2">
            <span className="font-semibold">
              When you post Contributions, you grant us a license (including use of your name, trademarks, and
              logos):&nbsp;
            </span>
            By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual,
            non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to: use, copy,
            reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display,
            reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including, without
            limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare
            derivative works of, or incorporate into other works, your Contributions, and to sublicense the licenses
            granted in this section. Our use and distribution may occur in any media formats and through any media
            channels.
          </div>
          <div className="mt-2">
            This license includes our use of your name, company name, and franchise name, as applicable, and any of the
            trademarks, service marks, trade names, logos, and personal and commercial images you provide.
          </div>
          <div className="mt-2">
            <span className="font-semibold">You are responsible for what you post or upload:</span> By sending us
            Submissions and/or posting Contributions through any part of the Services or making Contributions accessible
            through the Services by linking your account through the Services to any of your social networking accounts,
            you:
          </div>
          <ul className="list-disc list-inside mt-2 pl-2">
            <li>
              confirm that you have read and agree with our{' '}
              <a className="text-primary underline underline-offset-2" href="#prohibited" data-custom-class="link">
                Prohibited Activities
              </a>{' '}
              and will not post, send, publish, upload, or transmit through the Services any Submission nor post any
              Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive,
              discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or
              misleading;
            </li>
            <li>
              to the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or
              Contribution;
            </li>
            <li>
              warrant that any such Submission and/or Contributions are original to you or that you have the necessary
              rights and licenses to submit such Submissions and/or Contributions and that you have full authority to
              grant us the above-mentioned rights in relation to your Submissions and/or Contributions; and
            </li>
            <li>
              warrant and represent that your Submissions and/or Contributions do not constitute confidential
              information.
            </li>
          </ul>
          <div className="mt-2">
            You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us
            for any and all losses that we may suffer because of your breach of (a) this section, (b) any third
            party&rsquo;s intellectual property rights, or (c) applicable law.
          </div>
          <div className="mt-2">
            <span className="font-semibold">We may remove or edit your Content:</span> Although we have no obligation to
            monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without
            notice if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal
            Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report
            you to the authorities.
          </div>
          <h2 id="userreps" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
            <h2 id="userreg" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
              4. User Registration
            </h2>
          </div>
          <div className="mt-2">
            You may be required to register to use the Services. You agree to keep your password confidential and will
            be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change
            a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene,
            or otherwise objectionable.
          </div>
          <h2 id="purchases" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            5. Purchases and Payment
          </h2>
          <div className="mt-2">We accept the following forms of payment:</div>
          <ul className="list-disc list-inside mt-2">
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
          <h2 id="subscriptions" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            6. Subscriptions
          </h2>
          <h3 className="text-xl font-semibold mt-4 mb-1">Billing and Renewal</h3>
          <div className="mt-2">
            Your subscription will continue and automatically renew unless canceled. You consent to our charging your
            payment method on a recurring basis without requiring your prior approval for each recurring charge, until
            such time as you cancel the applicable order. The length of your billing cycle is monthly.
          </div>
          <h3 className="text-xl font-semibold mt-4 mb-1">Cancellation</h3>
          <div className="mt-2">
            You can cancel your subscription at any time by logging into your account. Your cancellation will take
            effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services,
            please email us at{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>
            .
          </div>
          <h3 className="text-xl font-semibold mt-4 mb-1">Fee Changes</h3>
          We may, from time to time, make changes to the subscription fee and will communicate any price changes to you
          in accordance with applicable law.
          <h2 id="prohibited" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            7. Prohibited Activities
          </h2>
          <div className="mt-2">
            You may not access or use the Services for any purpose other than that for which we make the Services
            available. The Services may not be used in connection with any commercial endeavors except those that are
            specifically endorsed or approved by us.
          </div>
          <div className="mt-2">As a user of the Services, you agree not to:</div>
          <ul className="list-disc list-inside mt-2 pl-2">
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
          <h2 id="ugc" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            8. User Generated Contributions
          </h2>
          <div className="mt-2">
            The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums,
            and other functionality, and may provide you with the opportunity to create, submit, post, display,
            transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services,
            including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or
            personal information or other material (collectively, "Contributions"). Contributions may be viewable by
            other users of the Services and through third-party websites. As such, any Contributions you transmit may be
            treated as non-confidential and non-proprietary. When you create or make available any Contributions, you
            thereby represent and warrant that:
          </div>
          <ul className="list-disc list-inside mt-2 pl-2">
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
          <h2 id="license" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            9. Contribution License
          </h2>
          <div className="mt-2">
            By posting your Contributions to any part of the Services, you automatically grant, and you represent and
            warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual,
            non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy,
            reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform,
            publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such
            Contributions (including, without limitation, your image and voice) for any purpose, commercial,
            advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such
            Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in
            any media formats and through any media channels.
          </div>
          <div className="mt-2">
            This license will apply to any form, media, or technology now known or hereafter developed, and includes our
            use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks,
            trade names, logos, and personal and commercial images you provide. You waive all moral rights in your
            Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
          </div>
          <div className="mt-2">
            We do not assert any ownership over your Contributions. You retain full ownership of all of your
            Contributions and any intellectual property rights or other proprietary rights associated with your
            Contributions. We are not liable for any statements or representations in your Contributions provided by you
            in any area on the Services. You are solely responsible for your Contributions to the Services and you
            expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against
            us regarding your Contributions.
          </div>
          <div className="mt-2">
            We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any
            Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the
            Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice.
            We have no obligation to monitor your Contributions.
          </div>
          <h2 id="sitemanage" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
          <h2 id="ppyes" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            11. Privacy Policy
          </h2>
          <div className="mt-2">
            We care about data privacy and security. Please review our Privacy Policy:{' '}
            <a href="/privacy-policy" target="_blank" className="text-primary underline underline-offset-2">
              https://kreatli.com/privacy-policy
            </a>
            . By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal
            Terms. Please be advised the Services are hosted in Poland. If you access the Services from any other region
            of the world with laws or other requirements governing personal data collection, use, or disclosure that
            differ from applicable laws in Poland, then through your continued use of the Services, you are transferring
            your data to Poland, and you expressly consent to have your data transferred to and processed in Poland.
          </div>
          <h2 id="terms" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
          <h2 id="modifications" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
          <h2 id="law" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            14. Governing Law
          </h2>
          <div className="mt-2">
            These Legal Terms are governed by and interpreted following the laws of Poland, and the use of the United
            Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual
            residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by
            obligatory provisions of the law in your country to residence. Kreatli and yourself both agree to submit to
            the non-exclusive jurisdiction of the courts of Warsaw, which means that you may make a claim to defend your
            consumer protection rights in regards to these Legal Terms in Poland, or in the EU country in which you
            reside.
          </div>
          <h2 id="disputes" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
            15. Dispute Resolution
          </h2>
          <div className="mt-2">
            The European Commission provides an&nbsp;
            <a
              className="text-primary underline underline-offset-2"
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              data-custom-class="link"
            >
              online dispute resolution platform
            </a>
            , which you can access. If you would like to bring this subject to our attention, please contact us.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="corrections" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
            <h2 id="disclaimer" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
            <h2 id="liability" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
            <h2 id="indemnification" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
            <h2 id="userdata" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
            <h2 id="electronic" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
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
            <h2 id="california" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
              22. California Users and Residents
            </h2>
          </div>
          <div className="mt-2">
            If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of
            the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North
            Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
          </div>
          <div data-custom-class="heading_1">
            <h2 id="misc" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
              23. Miscellaneous
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
            <h2 id="contact" className="text-2xl mt-6 mb-1 font-semibold scroll-m-24">
              24. Contact Us
            </h2>
          </div>
          <div className="mt-2">
            In order to resolve a complaint regarding the Services or to receive further information regarding use of
            the Services, please contact us using this email address{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}
