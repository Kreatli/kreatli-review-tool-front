import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import Head from 'next/head';

import { Header } from '../components/layout/Header';
import { useSession } from '../hooks/useSession';

export default function PrivacyPolicy() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Privacy Policy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header />
      <div className="border-t border-foreground-200 p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
          <p className="mb-6 text-foreground-500">Last updated July 20, 2025</p>
          <div>
            This Privacy Notice for Kreatli ("<span className="font-semibold">we</span>," "
            <span className="font-semibold">us</span>," or "<span className="font-semibold">our</span>"), describes how
            and why we might access, collect, store, use, and/or share ("<span className="font-semibold">process</span>
            ") your personal information when you use our services ("<span className="font-semibold">Services</span>"),
            including when you:
          </div>
          <ul className="mt-2 list-inside list-disc">
            <li data-custom-class="body_text">
              Visit our website at{' '}
              <a href="https://kreatli.com/" target="_blank" className="text-primary underline underline-offset-2">
                https://kreatli.com
              </a>{' '}
              or any website of ours that links to this Privacy Notice
            </li>
            <li data-custom-class="body_text">
              Use Kreatli - an end-to-end production management platform for Creative Teams. It brings all your
              projects, communication, and files into one organized space, helping you manage your workflow with
              features like intuitive file organization, live collaboration tools, and powerful storage solutions.
            </li>
            <li data-custom-class="body_text">
              Engage with us in other related ways, including any sales, marketing, or events
            </li>
          </ul>
          <div className="mt-2">
            <div>
              <span className="font-semibold">Questions or concerns?&nbsp;</span>Reading this Privacy Notice will help
              you understand your privacy rights and choices. We are responsible for making decisions about how your
              personal information is processed. If you do not agree with our policies and practices, please do not use
              our Services. If you still have any questions or concerns, please contact us at{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>
              .
            </div>
            <div>
              <h2 className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">Summary of key points</h2>
            </div>
            <div>
              This summary provides key points from our Privacy Notice, but you can find out more details about any of
              these topics by clicking the link following each key point or by using our{' '}
              <a href="#toc" className="text-primary underline underline-offset-2">
                table of contents
              </a>{' '}
              below to find the section you are looking for.
            </div>
            <div className="mt-2">
              <span className="font-semibold">What personal information do we process?</span> When you visit, use, or
              navigate our Services, we may process personal information depending on how you interact with us and the
              Services, the choices you make, and the products and features you use. Learn more about&nbsp;
              <a href="#infocollect" className="text-primary underline underline-offset-2">
                personal information you disclose to us
              </a>
              .
            </div>
            <div className="mt-2">
              <span className="font-semibold">Do we process any sensitive personal information?&nbsp;</span>Some of the
              information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial
              or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal
              information.
            </div>
            <div className="mt-2">
              <span className="font-semibold">Do we collect any information from third parties?</span> We do not collect
              any information from third parties.
            </div>
            <div className="mt-2">
              <span className="font-semibold">How do we process your information?</span> We process your information to
              provide, improve, and administer our Services, communicate with you, for security and fraud prevention,
              and to comply with law. We may also process your information for other purposes with your consent. We
              process your information only when we have a valid legal reason to do so. Learn more about&nbsp;
              <a href="#infouse" className="text-primary underline underline-offset-2">
                how we process your information
              </a>
              .
            </div>
            <div className="mt-2">
              <span className="font-semibold">
                In what situations and with which parties do we share personal information?
              </span>{' '}
              We may share information in specific situations and with specific third parties. Learn more about&nbsp;
              <a href="#whoshare" className="text-primary underline underline-offset-2">
                when and with whom we share your personal information
              </a>
              .
            </div>
            <div className="mt-2">
              <span className="font-semibold">How do we keep your information safe?</span> We have adequate
              organizational and technical processes and procedures in place to protect your personal information.
              However, no electronic transmission over the internet or information storage technology can be guaranteed
              to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized
              third parties will not be able to defeat our security and improperly collect, access, steal, or modify
              your information. Learn more about&nbsp;
              <a href="#infosafe" className="text-primary underline underline-offset-2">
                how we keep your information safe
              </a>
              .
            </div>
            <div className="mt-2">
              <span className="font-semibold">What are your rights?</span> Depending on where you are located
              geographically, the applicable privacy law may mean you have certain rights regarding your personal
              information. Learn more about&nbsp;
              <a href="#privacyrights" className="text-primary underline underline-offset-2">
                your privacy rights
              </a>
              .
            </div>
            <div className="mt-2">
              <span className="font-semibold">How do you exercise your rights?</span> The easiest way to exercise your
              rights is by contacting us. We will consider and act upon any request in accordance with applicable data
              protection laws.
            </div>
            <div className="mt-2">
              Want to learn more about what we do with any information we collect?&nbsp;
              <a href="#toc" className="text-primary underline underline-offset-2">
                Review the Privacy Notice in full
              </a>
              .
            </div>
            <div>
              <h2 id="toc" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                Table of contents
              </h2>
            </div>
            <ul className="mt-2 list-inside list-decimal space-y-1 pl-2">
              <li>
                <a href="#infocollect" className="text-primary underline underline-offset-2">
                  What information do we collect?
                </a>
              </li>
              <li>
                <a href="#infouse" className="text-primary underline underline-offset-2">
                  How do we process your information?
                </a>
              </li>
              <li>
                <a href="#legalbases" className="text-primary underline underline-offset-2">
                  What legal bases do we rely on to process your personal information?
                </a>
              </li>
              <li>
                <a href="#whoshare" className="text-primary underline underline-offset-2">
                  When and with whom do we share your personal information?
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-primary underline underline-offset-2">
                  Do we use cookies and other tracking technologies?
                </a>
              </li>
              <li>
                <a href="#sociallogins" className="text-primary underline underline-offset-2">
                  How do we handle your social logins?
                </a>
              </li>
              <li>
                <a href="#inforetain" className="text-primary underline underline-offset-2">
                  How long do we keep your information?
                </a>
              </li>
              <li>
                <a href="#infosafe" className="text-primary underline underline-offset-2">
                  How do we keep your information safe?
                </a>
              </li>
              <li>
                <a href="#infominors" className="text-primary underline underline-offset-2">
                  Do we collect information from minors?
                </a>
              </li>
              <li>
                <a href="#privacyrights" className="text-primary underline underline-offset-2">
                  What are your privacy rights?
                </a>
              </li>
              <li>
                <a href="#DNT" className="text-primary underline underline-offset-2">
                  Controls for do-not-track features
                </a>
              </li>
              <li>
                <a href="#uslaws" className="text-primary underline underline-offset-2">
                  Do United States residents have specific privacy rights?
                </a>
              </li>
              <li>
                <a href="#policyupdates" className="text-primary underline underline-offset-2">
                  Do we make updates to this notice?
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary underline underline-offset-2">
                  How can you contact us about this notice?
                </a>
              </li>
              <li>
                <a href="#request" className="text-primary underline underline-offset-2">
                  How can you review, update, or delete the data we collect from you?
                </a>
              </li>
            </ul>
            <h2 id="infocollect" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
              1. What information do we collect?
            </h2>
            <h3 className="mb-1 mt-4 text-xl font-semibold">Personal information you disclose to us</h3>
            In Short: We collect personal information that you provide to us.
            <div className="mt-2">
              We collect personal information that you voluntarily provide to us when you register on the
              Services,&nbsp;express an interest in obtaining information about us or our products and Services, when
              you participate in activities on the Services, or otherwise when you contact us.
            </div>
            <div className="mt-2">
              <span className="font-semibold">Personal Information Provided by You.</span> The personal information that
              we collect depends on the context of your interactions with us and the Services, the choices you make, and
              the products and features you use. The personal information we collect may include the following:
            </div>
            <ul className="mt-2 list-inside list-disc">
              <li data-custom-class="body_text">email addresses</li>
              <li data-custom-class="body_text">usernames</li>
              <li data-custom-class="body_text">passwords</li>
              <li data-custom-class="body_text">contact preferences</li>
            </ul>
            <div className="mt-2">
              <span className="font-semibold">Sensitive Information.</span> We do not process sensitive information.
            </div>
            <div className="mt-2">
              <span className="font-semibold">Payment Data.</span> We may collect data necessary to process your payment
              if you choose to make purchases, such as your payment instrument number, and the security code associated
              with your payment instrument. All payment data is handled and stored by Stripe. You may find their privacy
              notice link(s) here:{' '}
              <a
                href="https://stripe.com/en-de/privacy"
                target="_blank"
                className="text-primary underline underline-offset-2"
              >
                https://stripe.com/en-de/privacy
              </a>
              .
            </div>
            <div className="mt-2">
              <span className="font-semibold">Social Media Login Data.&nbsp;</span>We may provide you with the option to
              register with us using your existing social media account details, like your Facebook, X, or other social
              media account. If you choose to register in this way, we will collect certain profile information about
              you from the social media provider, as described in the section called{' '}
              <a href="#sociallogins" className="text-primary underline underline-offset-2">
                How do we handle your social logins?
              </a>{' '}
              below.
            </div>
            <div className="mt-2">
              All personal information that you provide to us must be true, complete, and accurate, and you must notify
              us of any changes to such personal information.
            </div>
            <div className="mt-2">
              <h3 className="mb-1 mt-4 text-xl font-semibold">Information automatically collected</h3>
              In Short: Some information &mdash; such as your Internet Protocol (IP) address and/or browser and device
              characteristics &mdash; is collected automatically when you visit our Services.
            </div>
            <div className="mt-2">
              We automatically collect certain information when you visit, use, or navigate the Services. This
              information does not reveal your specific identity (like your name or contact information) but may include
              device and usage information, such as your IP address, browser and device characteristics, operating
              system, language preferences, referring URLs, device name, country, location, information about how and
              when you use our Services, and other technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our internal analytics and reporting
              purposes.
            </div>
            <div className="mt-2">
              Like many businesses, we also collect information through cookies and similar technologies.{' '}
            </div>
            <div className="mt-2">The information we collect includes:</div>
            <ul className="mt-2 list-inside list-disc">
              <li data-custom-class="body_text">
                <span className="font-semibold">Log and Usage Data.</span> Log and usage data is service-related,
                diagnostic, usage, and performance information our servers automatically collect when you access or use
                our Services and which we record in log files. Depending on how you interact with us, this log data may
                include your IP address, device information, browser type, and settings and information about your
                activity in the Services&nbsp;(such as the date/time stamps associated with your usage, pages and files
                viewed, searches, and other actions you take such as which features you use), device event information
                (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
              </li>
              <li data-custom-class="body_text">
                <span className="font-semibold">Device Data.</span> We collect device data such as information about
                your computer, phone, tablet, or other device you use to access the Services. Depending on the device
                used, this device data may include information such as your IP address (or proxy server), device and
                application identification numbers, location, browser type, hardware model, Internet service provider
                and/or mobile carrier, operating system, and system configuration information.
              </li>
              <li data-custom-class="body_text">
                <span className="font-semibold">Location Data.</span> We collect location data such as information about
                your device's location, which can be either precise or imprecise. How much information we collect
                depends on the type and settings of the device you use to access the Services. For example, we may use
                GPS and other technologies to collect geolocation data that tells us your current location (based on
                your IP address). You can opt out of allowing us to collect this information either by refusing access
                to the information or by disabling your Location setting on your device. However, if you choose to opt
                out, you may not be able to use certain aspects of the Services.
              </li>
            </ul>
            <div>
              <h3 className="mb-1 mt-4 text-xl font-semibold">Google API</h3>
              Our use of information received from Google APIs will adhere to&nbsp;
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Google API Services User Data Policy
              </a>
              , including the&nbsp;
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Limited Use requirements
              </a>
              .<br />
            </div>
            <div>
              <h2 id="infouse" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                2. How do we process your information?
              </h2>
              In Short: We process your information to provide, improve, and administer our Services, communicate with
              you, for security and fraud prevention, and to comply with law. We process the personal information for
              the following purposes listed below. We may also process your information for other purposes only with
              your prior explicit consent.
            </div>
            <div className="mt-2">
              We process your personal information for a variety of reasons, depending on how you interact with our
              Services, including:
            </div>
            <ul className="mt-2 list-inside list-disc">
              <li data-custom-class="body_text">
                <span className="font-semibold">
                  To facilitate account creation and authentication and otherwise manage user accounts.&nbsp;
                </span>
                We may process your information so you can create and log in to your account, as well as keep your
                account in working order.
              </li>
              <li data-custom-class="body_text">
                <span className="font-semibold">To save or protect an individual's vital interest.</span> We may process
                your information when necessary to save or protect an individual&rsquo;s vital interest, such as to
                prevent harm.
              </li>
            </ul>
            <div>
              <h2 id="legalbases" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                3. What legal bases do we rely on to process your information?
              </h2>
              In Short: We only process your personal information when we believe it is necessary and we have a valid
              legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with
              laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your
              rights, or to fulfill our legitimate business interests.
            </div>
            <div className="mt-2">
              <em>
                <span className="font-semibold">
                  <u>If you are located in the EU or UK, this section applies to you.</u>
                </span>
              </em>
            </div>
            <div className="mt-2">
              The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we
              rely on in order to process your personal information. As such, we may rely on the following legal bases
              to process your personal information:
            </div>
            <ul className="mt-2 list-inside list-disc">
              <li data-custom-class="body_text">
                <span className="font-semibold">Consent.&nbsp;</span>We may process your information if you have given
                us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw
                your consent at any time. Learn more about&nbsp;
                <a href="#withdrawconsent" className="text-primary underline underline-offset-2">
                  withdrawing your consent
                </a>
                .
              </li>
              <li data-custom-class="body_text">
                <span className="font-semibold">Legal Obligations.</span> We may process your information where we
                believe it is necessary for compliance with our legal obligations, such as to cooperate with a law
                enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information
                as evidence in litigation in which we are involved.
              </li>
              <li data-custom-class="body_text">
                <span className="font-semibold">Vital Interests.</span> We may process your information where we believe
                it is necessary to protect your vital interests or the vital interests of a third party, such as
                situations involving potential threats to the safety of any person.
              </li>
            </ul>
            <div>
              <div className="mt-2">
                <u>
                  <em>If you are located in Canada, this section applies to you.</em>
                </u>
              </div>
              <div className="mt-2">
                We may process your information if you have given us specific permission (i.e., express consent) to use
                your personal information for a specific purpose, or in situations where your permission can be inferred
                (i.e., implied consent). You can&nbsp;
                <a href="#withdrawconsent" className="text-primary underline underline-offset-2">
                  withdraw your consent
                </a>
                &nbsp;at any time.
              </div>
              <div className="mt-2">
                In some exceptional cases, we may be legally permitted under applicable law to process your information
                without your consent, including, for example:
              </div>
              <ul className="mt-2 list-inside list-disc">
                <li data-custom-class="body_text">
                  If collection is clearly in the interests of an individual and consent cannot be obtained in a timely
                  way
                </li>
                <li data-custom-class="body_text">For investigations and fraud detection and prevention</li>
                <li data-custom-class="body_text">For business transactions provided certain conditions are met</li>
                <li data-custom-class="body_text">
                  If it is contained in a witness statement and the collection is necessary to assess, process, or
                  settle an insurance claim
                </li>
                <li data-custom-class="body_text">
                  For identifying injured, ill, or deceased persons and communicating with next of kin
                </li>
                <li data-custom-class="body_text">
                  If we have reasonable grounds to believe an individual has been, is, or may be victim of financial
                  abuse
                </li>
                <li data-custom-class="body_text">
                  If it is reasonable to expect collection and use with consent would compromise the availability or the
                  accuracy of the information and the collection is reasonable for purposes related to investigating a
                  breach of an agreement or a contravention of the laws of Canada or a province
                </li>
                <li data-custom-class="body_text">
                  If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court
                  relating to the production of records
                </li>
                <li data-custom-class="body_text">
                  If it was produced by an individual in the course of their employment, business, or profession and the
                  collection is consistent with the purposes for which the information was produced
                </li>
                <li data-custom-class="body_text">
                  If the collection is solely for journalistic, artistic, or literary purposes
                </li>
                <li data-custom-class="body_text">
                  If the information is publicly available and is specified by the regulations
                </li>
                <li data-custom-class="body_text">
                  We may disclose de-identified information for approved research or statistics projects, subject to
                  ethics oversight and confidentiality commitments
                </li>
              </ul>
              <div>
                <h2 id="whoshare" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                  4. When and with whom do we share your personal information?
                </h2>
                In Short: We may share information in specific situations described in this section and/or with the
                following third parties.
              </div>
              <div className="mt-2">We may need to share your personal information in the following situations:</div>
              <ul className="mt-2 list-inside list-disc">
                <li data-custom-class="body_text">
                  <span className="font-semibold">Business Transfers.</span> We may share or transfer your information
                  in connection with, or during negotiations of, any merger, sale of company assets, financing, or
                  acquisition of all or a portion of our business to another company.
                </li>
              </ul>
              <div>
                <div>
                  <h2 id="cookies" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    5. Do we use cookies and other tracking technologies?
                  </h2>
                  In Short: We may use cookies and other tracking technologies to collect and store your information.
                </div>
                <div className="mt-2">
                  We may use cookies and similar tracking technologies (like web beacons and pixels) to gather
                  information when you interact with our Services. Some online tracking technologies help us maintain
                  the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and
                  assist with basic site functions.
                </div>
                <div className="mt-2">
                  We also permit third parties and service providers to use online tracking technologies on our Services
                  for analytics and advertising, including to help manage and display advertisements, to tailor
                  advertisements to your interests, or to send abandoned shopping cart reminders (depending on your
                  communication preferences). The third parties and service providers use their technology to provide
                  advertising about products and services tailored to your interests which may appear either on our
                  Services or on other websites.
                </div>
                <div className="mt-2">
                  To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes
                  targeted advertising, as defined under the applicable laws) under applicable US state laws, you can
                  opt out of these online tracking technologies by submitting a request as described below under section{' '}
                  <a href="#uslaws" className="text-primary underline underline-offset-2">
                    Do United States residents have specific privacy rights?
                  </a>{' '}
                  .
                </div>
                <div className="mt-2">
                  Specific information about how we use such technologies and how you can refuse certain cookies is set
                  out in our Cookie Notice.
                </div>
                <h3 className="mb-1 mt-4 text-xl font-semibold">Google Analytics</h3>
                We may share your information with Google Analytics to track and analyze the use of the Services. The
                Google Analytics Advertising Features that we may use include: Google Analytics Demographics and
                Interests Reporting and Google Display Network Impressions Reporting. To opt out of being tracked by
                Google Analytics across the Services, visit{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
                . You can opt out of Google Analytics Advertising Features through{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Ads Settings
                </a>{' '}
                and Ad Settings for mobile apps. Other opt out means include{' '}
                <a
                  href="http://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  http://optout.networkadvertising.org/
                </a>{' '}
                and{' '}
                <a
                  href="http://www.networkadvertising.org/mobile-choice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  http://www.networkadvertising.org/mobile-choice
                </a>
                . For more information on the privacy practices of Google, please visit the{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Google Privacy &amp; Terms page
                </a>
                .
                <div>
                  <h2 id="sociallogins" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    6. How do we handle your social logins?
                  </h2>
                  In Short: If you choose to register or log in to our Services using a social media account, we may
                  have access to certain information about you.
                </div>
                <div className="mt-2">
                  Our Services offer you the ability to register and log in using your third-party social media account
                  details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile
                  information about you from your social media provider. The profile information we receive may vary
                  depending on the social media provider concerned, but will often include your name, email address,
                  friends list, and profile picture, as well as other information you choose to make public on such a
                  social media platform.
                </div>
                <div className="mt-2">
                  We will use the information we receive only for the purposes that are described in this Privacy Notice
                  or that are otherwise made clear to you on the relevant Services. Please note that we do not control,
                  and are not responsible for, other uses of your personal information by your third-party social media
                  provider. We recommend that you review their privacy notice to understand how they collect, use, and
                  share your personal information, and how you can set your privacy preferences on their sites and apps.
                </div>
                <div>
                  <h2 id="inforetain" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    7. How long do we keep your information?
                  </h2>
                  In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this
                  Privacy Notice unless otherwise required by law.
                </div>
                <div className="mt-2">
                  We will only keep your personal information for as long as it is necessary for the purposes set out in
                  this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax,
                  accounting, or other legal requirements). No purpose in this notice will require us keeping your
                  personal information for longer than the period of time in which users have an account with us.
                </div>
                <div className="mt-2">
                  When we have no ongoing legitimate business need to process your personal information, we will either
                  delete or anonymize such information, or, if this is not possible (for example, because your personal
                  information has been stored in backup archives), then we will securely store your personal information
                  and isolate it from any further processing until deletion is possible.
                </div>
                <div>
                  <h2 id="infosafe" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    8. How do we keep your information safe?
                  </h2>
                  In Short: We aim to protect your personal information through a system of organizational and technical
                  security measures.
                </div>
                <div className="mt-2">
                  We have implemented appropriate and reasonable technical and organizational security measures designed
                  to protect the security of any personal information we process. However, despite our safeguards and
                  efforts to secure your information, no electronic transmission over the Internet or information
                  storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that
                  hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security
                  and improperly collect, access, steal, or modify your information. Although we will do our best to
                  protect your personal information, transmission of personal information to and from our Services is at
                  your own risk. You should only access the Services within a secure environment.
                </div>
                <div>
                  <h2 id="infominors" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    9. Do we collect information from minors?
                  </h2>
                  In Short: We do not knowingly collect data from or market to children under 18 years of age or the
                  equivalent age as specified by law in your jurisdiction.
                </div>
                <div className="mt-2">
                  We do not knowingly collect, solicit data from, or market to children under 18 years of age or the
                  equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal
                  information. By using the Services, you represent that you are at least 18 or the equivalent age as
                  specified by law in your jurisdiction or that you are the parent or guardian of such a minor and
                  consent to such minor dependent&rsquo;s use of the Services. If we learn that personal information
                  from users less than 18 years of age or the equivalent age as specified by law in your jurisdiction
                  has been collected, we will deactivate the account and take reasonable measures to promptly delete
                  such data from our records. If you become aware of any data we may have collected from children under
                  age 18 or the equivalent age as specified by law in your jurisdiction, please contact us at
                  support@kreatli.com.
                </div>
                <div>
                  <h2 id="privacyrights" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    10. What are your privacy rights?
                  </h2>
                  In Short: Depending on your state of residence in the US or in some regions, such as the European
                  Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you
                  greater access to and control over your personal information. You may review, change, or terminate
                  your account at any time, depending on your country, province, or state of residence.
                </div>
                <div className="mt-2">
                  In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable
                  data protection laws. These may include the right (i) to request access and obtain a copy of your
                  personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of
                  your personal information; (iv) if applicable, to data portability; and (v) not to be subject to
                  automated decision-making. If a decision that produces legal or similarly significant effects is made
                  solely by automated means, we will inform you, explain the main factors, and offer a simple way to
                  request human review. In certain circumstances, you may also have the right to object to the
                  processing of your personal information. You can make such a request by contacting us by using the
                  contact details provided in the section{' '}
                  <a href="#contact" className="text-primary underline underline-offset-2">
                    How can you contact us about this notice?
                  </a>{' '}
                  below.
                </div>
                <div className="mt-2">
                  We will consider and act upon any request in accordance with applicable data protection laws.
                </div>
                <div className="mt-2">
                  If you are located in the EEA or UK and you believe we are unlawfully processing your personal
                  information, you also have the right to complain to your{' '}
                  <a
                    href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    Member State data protection authority
                  </a>{' '}
                  or&nbsp;
                  <a
                    href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    UK data protection authority
                  </a>
                  .
                </div>
                <div className="mt-2">
                  If you are located in Switzerland, you may contact the{' '}
                  <a
                    href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    Federal Data Protection and Information Commissioner
                  </a>
                  .
                </div>
                <div id="withdrawconsent" className="mt-2 scroll-m-24">
                  <u>Withdrawing your consent:</u> If we are relying on your consent to process your personal
                  information, which may be express and/or implied consent depending on the applicable law, you have the
                  right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us
                  by using the contact details provided in the section{' '}
                  <a href="#contact" className="text-primary underline underline-offset-2">
                    How can you contact us about this notice?
                  </a>{' '}
                  below or updating your preferences.
                </div>
                <div className="mt-2">
                  However, please note that this will not affect the lawfulness of the processing before its withdrawal
                  nor, when applicable law allows, will it affect the processing of your personal information conducted
                  in reliance on lawful processing grounds other than consent.
                </div>
                <h3 className="mb-1 mt-4 text-xl font-semibold">Account Information</h3>
                If you would at any time like to review or change the information in your account or terminate your
                account, you can:
                <ul className="mt-2 list-inside list-disc">
                  <li data-custom-class="body_text">Contact us using the contact information provided.</li>
                </ul>
                <div className="mt-2">
                  Upon your request to terminate your account, we will deactivate or delete your account and information
                  from our active databases. However, we may retain some information in our files to prevent fraud,
                  troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with
                  applicable legal requirements.
                </div>
                <div className="mt-2">
                  <u>Cookies and similar technologies:</u> Most Web browsers are set to accept cookies by default. If
                  you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you
                  choose to remove cookies or reject cookies, this could affect certain features or services of our
                  Services.{' '}
                </div>
                <div className="mt-2">
                  If you have questions or comments about your privacy rights, you may email us at support@kreatli.com.
                </div>
                <div className="mt-2">
                  <h2 id="DNT" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    11. Controls for do-not-track features
                  </h2>
                  Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track
                  ("DNT") feature or setting you can activate to signal your privacy preference not to have data about
                  your online browsing activities monitored and collected. At this stage, no uniform technology standard
                  for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond
                  to DNT browser signals or any other mechanism that automatically communicates your choice not to be
                  tracked online. If a standard for online tracking is adopted that we must follow in the future, we
                  will inform you about that practice in a revised version of this Privacy Notice.
                </div>
                <div className="mt-2">
                  California law requires us to let you know how we respond to web browser DNT signals. Because there
                  currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not
                  respond to them at this time.
                </div>
                <div>
                  <h2 id="uslaws" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    12. Do United States residents have specific privacy rights?
                  </h2>
                  In Short: If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana,
                  Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode
                  Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive
                  details about the personal information we maintain about you and how we have processed it, correct
                  inaccuracies, get a copy of, or delete your personal information. You may also have the right to
                  withdraw your consent to our processing of your personal information. These rights may be limited in
                  some circumstances by applicable law. More information is provided below.
                </div>
                <h3 className="mb-1 mt-4 text-xl font-semibold">Categories of Personal Information We Collect</h3>
                The table below shows the categories of personal information we have collected in the past twelve (12)
                months. The table includes illustrative examples of each category and does not reflect the personal
                information we collect from you. For a comprehensive inventory of all personal information we process,
                please refer to the section{' '}
                <a href="#infocollect" className="text-primary underline underline-offset-2">
                  What information do we collect?
                </a>
                .
                <Table aria-label="Categories of personal information table" className="my-4">
                  <TableHeader>
                    <TableColumn>Category</TableColumn>
                    <TableColumn>Examples</TableColumn>
                    <TableColumn>Collected</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>A. Identifiers</TableCell>
                      <TableCell>
                        Contact details, such as real name, alias, postal address, telephone or mobile contact number,
                        unique personal identifier, online identifier, Internet Protocol address, email address, and
                        account name
                      </TableCell>
                      <TableCell>YES</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        B. Personal information as defined in the California Customer Records statute
                      </TableCell>
                      <TableCell>
                        <div>
                          Name, contact information, education, employment, employment history, and financial
                          information
                        </div>
                      </TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>C. Protected classification characteristics under state or federal law</TableCell>
                      <TableCell>
                        Gender, age, date of birth, race and ethnicity, national origin, marital status, and other
                        demographic data
                      </TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>D. Commercial information</TableCell>
                      <TableCell>
                        Transaction information, purchase history, financial details, and payment information
                      </TableCell>
                      <TableCell>YES</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>E. Biometric information</TableCell>
                      <TableCell>
                        <div>Fingerprints and voiceprints</div>
                      </TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>F. Internet or other similar network activity</TableCell>
                      <TableCell>
                        Browsing history, search history, online behavior, interest data, and interactions with our and
                        other websites, applications, systems, and advertisements
                      </TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>G. Geolocation data</TableCell>
                      <TableCell>Device location</TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>H. Audio, electronic, sensory, or similar information</TableCell>
                      <TableCell>
                        Images and audio, video or call recordings created in connection with our business activities
                      </TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>I. Professional or employment-related information</TableCell>
                      <TableCell>
                        Business contact details in order to provide you our Services at a business level or job title,
                        work history, and professional qualifications if you apply for a job with us
                      </TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>J. Education Information</TableCell>
                      <TableCell>Student records and directory information</TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>K. Inferences drawn from collected personal information</TableCell>
                      <TableCell>
                        Inferences drawn from any of the collected personal information listed above to create a profile
                        or summary about, for example, an individual&rsquo;s preferences and characteristics
                      </TableCell>
                      <TableCell>NO</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div>
                  We may also collect other personal information outside of these categories through instances where you
                  interact with us in person, online, or by phone or mail in the context of:
                </div>
                <ul className="mt-2 list-inside list-disc">
                  <li data-custom-class="body_text">Receiving help through our customer support channels;</li>
                  <li data-custom-class="body_text">Participation in customer surveys or contests; and</li>
                  <li data-custom-class="body_text">
                    Facilitation in the delivery of our Services and to respond to your inquiries.
                  </li>
                </ul>
                <div className="mt-2">
                  We will use and retain the collected personal information as needed to provide the Services or for:
                </div>
                <ul className="mt-2 list-inside list-disc">
                  <li data-custom-class="body_text">Category A - As long as the user has an account with us</li>
                  <li data-custom-class="body_text">Category D - As long as the user has an account with us</li>
                </ul>
                <div>
                  <h3 className="mb-1 mt-4 text-xl font-semibold">Sources of Personal Information</h3>
                  Learn more about the sources of personal information we collect in{' '}
                  <a href="#infocollect" className="text-primary underline underline-offset-2">
                    What information do we collect?
                  </a>
                  <h3 className="mb-1 mt-4 text-xl font-semibold">How We Use and Share Personal Information</h3>
                  Learn more about how we use your personal information in the section{' '}
                  <a href="#infouse" className="text-primary underline underline-offset-2">
                    How do we process your information?
                  </a>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Will your information be shared with anyone else?</span>
                </div>
                <div className="mt-2">
                  We may disclose your personal information with our service providers pursuant to a written contract
                  between us and each service provider. Learn more about how we disclose personal information to in the
                  section{' '}
                  <a href="#whoshare" className="text-primary underline underline-offset-2">
                    When and with whom do we share your personal information?
                  </a>
                </div>
                <div className="mt-2">
                  We may use your personal information for our own business purposes, such as for undertaking internal
                  research for technological development and demonstration. This is not considered to be "selling" of
                  your personal information.
                </div>
                <div className="mt-2">
                  We have not disclosed, sold, or shared any personal information to third parties for a business or
                  commercial purpose in the preceding twelve (12) months. We&nbsp;will not sell or share personal
                  information in the future belonging to website visitors, users, and other consumers.
                </div>
                <div className="mt-2">
                  <h3 className="mb-1 mt-4 text-xl font-semibold">Your Rights</h3>
                  You have rights under certain US state data protection laws. However, these rights are not absolute,
                  and in certain cases, we may decline your request as permitted by law. These rights include:
                </div>
                <ul className="mt-2 list-inside list-disc">
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to know</span> whether or not we are processing your personal
                    data
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to access&nbsp;</span>
                    your personal data
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to correct&nbsp;</span>
                    inaccuracies in your personal data
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to request</span> the deletion of your personal data
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to obtain a copy&nbsp;</span>
                    of the personal data you previously shared with us
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to non-discrimination</span> for exercising your rights
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to opt out</span> of the processing of your personal data if
                    it is used for targeted advertising (or sharing as defined under California&rsquo;s privacy law),
                    the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly
                    significant effects ("profiling")
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to access</span> the categories of personal data being
                    processed (as permitted by applicable law, including the privacy law in Minnesota)
                  </li>
                  <li data-custom-class="body_text">
                    <span className="font-semibold">Right to obtain</span> a list of the categories of third parties to
                    which we have disclosed personal data (as permitted by applicable law, including the privacy law in
                    California, Delaware, and Maryland)
                  </li>
                </ul>
                <div className="mt-2">
                  Depending upon the state where you live, you may also have the following rights:
                </div>
                <ul className="mt-2 list-inside list-disc">
                  <li data-custom-class="body_text">
                    Right to obtain a list of specific third parties to which we have disclosed personal data (as
                    permitted by applicable law, including the privacy law in Minnesota and Oregon)
                  </li>
                  <li data-custom-class="body_text">
                    Right to review, understand, question, and correct how personal data has been profiled (as permitted
                    by applicable law, including the privacy law in Minnesota)
                  </li>
                  <li data-custom-class="body_text">
                    Right to limit use and disclosure of sensitive personal data (as permitted by applicable law,
                    including the privacy law in California)
                  </li>
                  <li data-custom-class="body_text">
                    Right to opt out of the collection of sensitive data and personal data collected through the
                    operation of a voice or facial recognition feature (as permitted by applicable law, including the
                    privacy law in Florida)
                  </li>
                </ul>
                <div>
                  <h3 className="mb-1 mt-4 text-xl font-semibold">How to Exercise Your Rights</h3>
                  To exercise these rights, you can contact us by emailing at{' '}
                  <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                    support@kreatli.com
                  </a>
                  , or by referring to the contact details at the bottom of this document.
                </div>
                <div className="mt-2">
                  Under certain US state data protection laws, you can designate an authorized agent to make a request
                  on your behalf. We may deny a request from an authorized agent that does not submit proof that they
                  have been validly authorized to act on your behalf in accordance with applicable laws.
                </div>
                <h3 className="mb-1 mt-4 text-xl font-semibold">Request Verification</h3>
                Upon receiving your request, we will need to verify your identity to determine you are the same person
                about whom we have the information in our system. We will only use personal information provided in your
                request to verify your identity or authority to make the request. However, if we cannot verify your
                identity from the information already maintained by us, we may request that you provide additional
                information for the purposes of verifying your identity and for security or fraud-prevention purposes.
                <div className="mt-2">
                  If you submit the request through an authorized agent, we may need to collect additional information
                  to verify your identity before processing your request and the agent will need to provide a written
                  and signed permission from you to submit such request on your behalf.
                </div>
                <h3 className="mb-1 mt-4 text-xl font-semibold">Appeals</h3>
                Under certain US state data protection laws, if we decline to take action regarding your request, you
                may appeal our decision by emailing us at{' '}
                <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                  support@kreatli.com
                </a>
                . We will inform you in writing of any action taken or not taken in response to the appeal, including a
                written explanation of the reasons for the decisions. If your appeal is denied, you may submit a
                complaint to your state attorney general.
                <h3 className="mb-1 mt-4 text-xl font-semibold">California "Shine The Light" Law</h3>
                California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who
                are California residents to request and obtain from us, once a year and free of charge, information
                about categories of personal information (if any) we disclosed to third parties for direct marketing
                purposes and the names and addresses of all third parties with which we shared personal information in
                the immediately preceding calendar year. If you are a California resident and would like to make such a
                request, please submit your request in writing to us by using the contact details provided in the
                section{' '}
                <a href="#contact" className="text-primary underline underline-offset-2">
                  How can you contact us about this notice?
                </a>{' '}
                .
                <div>
                  <h2 id="policyupdates" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    13. Do we make updates to this notice?
                  </h2>
                  In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
                </div>
                <div className="mt-2">
                  We may update this Privacy Notice from time to time. The updated version will be indicated by an
                  updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy
                  Notice, we may notify you either by prominently posting a notice of such changes or by directly
                  sending you a notification. We encourage you to review this Privacy Notice frequently to be informed
                  of how we are protecting your information.
                </div>
                <h2 id="contact" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                  14. How can you contact us about this notice?
                </h2>
                If you have questions or comments about this notice, you may email us at{' '}
                <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                  support@kreatli.com
                </a>
                .
                <div>
                  <h2 id="request" className="mb-4 scroll-m-24 font-sans text-2xl font-bold sm:text-3xl">
                    15. How can you review, update, or delete the data we collect from you?
                  </h2>
                  Based on the applicable laws of your country or state of residence in the US, you may have the right
                  to request access to the personal information we collect from you, details about how we have processed
                  it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw
                  your consent to our processing of your personal information. These rights may be limited in some
                  circumstances by applicable law.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
