import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import Head from 'next/head';

import { Header } from '../components/layout/Header';
import { useSession } from '../hooks/useSession';

export default function Cookies() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Cookie Policy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header />
      <div className="border-t border-foreground-200 p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-sans text-3xl font-bold">Cookies Policy</h1>
          <p className="mb-6 text-foreground-500">Last updated July 20, 2025</p>
          <div>
            This Cookie Policy explains how Kreatli ("<span className="font-semibold">Company</span>," "
            <span className="font-semibold">we</span>," "<span className="font-semibold">us</span>
            ," and "<span className="font-semibold">our</span>") uses cookies and similar technologies to recognize you
            when you visit our website at&nbsp;
            <a href="https://kreatli.com" target="_blank" className="text-primary underline underline-offset-2">
              https://kreatli.com
            </a>{' '}
            ("<span className="font-semibold">Website</span>"). It explains what these technologies are and why we use
            them, as well as your rights to control our use of them.
          </div>
          <div className="mt-2">
            In some cases we may use cookies to collect personal information, or that becomes personal information if we
            combine it with other information.
          </div>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">What are cookies?</h2>
          </div>
          <div>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </div>
          <div className="mt-2">
            Cookies set by the website owner (in this case, Kreatli) are called "first-party cookies." Cookies set by
            parties other than the website owner are called "third-party cookies." Third-party cookies enable
            third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these third-party cookies can recognize your
            computer both when it visits the website in question and also when it visits certain other websites.
          </div>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">Why do we use cookies?</h2>
          </div>
          <div>
            We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons
            in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
            Other cookies also enable us to track and target the interests of our users to enhance the experience on our
            Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other
            purposes. This is described in more detail below.
          </div>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">How can I control cookies?</h2>
          </div>
          <div>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
            setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select
            which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly
            necessary to provide you with services.
          </div>
          <div className="mt-2">
            The Cookie Consent Manager can be found in the notification banner and on our Website. If you choose to
            reject cookies, you may still use our Website though your access to some functionality and areas of our
            Website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
          </div>
          <div className="mt-2">
            The specific types of first- and third-party cookies served through our Website and the purposes they
            perform are described in the table below (please note that the specific&nbsp;cookies served may vary
            depending on the specific Online Properties you visit):
          </div>
          <h3 className="mb-1 mt-4 text-lg font-semibold">Analytics and customization cookies:</h3>
          <div className="mb-2">
            These cookies collect information that is used either in aggregate form to help us understand how our
            Website is being used or how effective our marketing campaigns are, or to help us customize our Website for
            you.
          </div>
          <Table>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Purpose</TableColumn>
              <TableColumn>Provider</TableColumn>
              <TableColumn>Services</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Expires in</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>_ga</TableCell>
                <TableCell>Records a particular ID used to come up with data about website usage by the user</TableCell>
                <TableCell>.kreatli.com</TableCell>
                <TableCell>
                  Google Analytics{' '}
                  <a
                    href="https://business.safety.google/privacy/"
                    target="_blank"
                    className="text-primary underline underline-offset-2"
                  >
                    View Service Privacy Policy
                  </a>
                </TableCell>
                <TableCell>http_cookie</TableCell>
                <TableCell>1 year 1 month 4 days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>_ga_#</TableCell>
                <TableCell>
                  Used to distinguish individual users by means of designation of a randomly generated number as client
                  identifier, which allows calculation of visits and sessions
                </TableCell>
                <TableCell>.kreatli.com</TableCell>
                <TableCell>
                  Google Analytics{' '}
                  <a
                    href="https://business.safety.google/privacy/"
                    target="_blank"
                    className="text-primary underline underline-offset-2"
                  >
                    View Service Privacy Policy
                  </a>
                </TableCell>
                <TableCell>http_cookie</TableCell>
                <TableCell>1 year 1 month 4 days</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">How can I control cookies on my browser?</h2>
          </div>
          <div>
            As the means by which you can refuse cookies through your web browser controls vary from browser to browser,
            you should visit your browser's help menu for more information. The following is information about how to
            manage cookies on the most popular browsers:
          </div>
          <ul className="mt-2 list-inside list-disc">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Internet Explorer
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&amp;redirectlocale=en-US"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Edge
              </a>
            </li>
            <li>
              <a
                href="https://help.opera.com/en/latest/web-preferences/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Opera
              </a>
            </li>
          </ul>
          <div className="mt-4">
            In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like
            to find out more information, please visit:
          </div>
          <ul className="mt-2 list-inside list-disc">
            <li>
              <a
                href="http://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Digital Advertising Alliance
              </a>
            </li>
            <li>
              <a
                href="https://youradchoices.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Digital Advertising Alliance of Canada
              </a>
            </li>
            <li>
              <a
                href="http://www.youronlinechoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                European Interactive Digital Advertising Alliance
              </a>
            </li>
          </ul>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">
              What about other tracking technologies, like web beacons?
            </h2>
          </div>
          <div>
            Cookies are not the only way to recognize or track visitors to a website. We may use other, similar
            technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These
            are tiny graphics files that contain a unique identifier that enables us to recognize when someone has
            visited our Website or opened an email including them. This allows us, for example, to monitor&nbsp;the
            traffic patterns of users from one page within a website to another, to deliver or communicate with cookies,
            to understand whether you have come to the website from an online advertisement displayed on a third-party
            website, to improve site performance, and to measure the success of email marketing campaigns. In many
            instances, these technologies are reliant on cookies to function properly, and so declining cookies will
            impair their functioning.
          </div>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">Do you use Flash cookies or Local Shared Objects?</h2>
          </div>
          <div>
            Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among
            other things, collect and store information about your use of our services, fraud prevention, and for other
            site operations.
          </div>
          <div className="mt-2">
            If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player
            to block Flash Cookies storage using the tools contained in the&nbsp;
            <a
              href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Website Storage Settings Panel
            </a>
            . You can also control Flash Cookies by going to the&nbsp;
            <a
              href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Global Storage Settings Panel
            </a>
            &nbsp;and&nbsp;following the instructions (which may include instructions that explain, for example, how to
            delete existing Flash Cookies (referred to "information" on the Macromedia site), how to prevent Flash LSOs
            from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block
            Flash Cookies that are not being delivered by the operator of the page you are on at the time).
          </div>
          <div className="mt-2">
            Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or
            impede the functionality of some Flash applications, including, potentially, Flash applications used in
            connection with our services or online content.
          </div>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">Do you serve targeted advertising?</h2>
          </div>
          <div>
            Third parties may serve cookies on your computer or mobile device to serve advertising through our Website.
            These companies may use information about your visits to this and other websites in order to provide
            relevant advertisements about goods and services that you may be interested in. They may also employ
            technology that is used to measure the effectiveness of advertisements. They can accomplish this by using
            cookies or web beacons to collect information about your visits to this and other sites in order to provide
            relevant advertisements about goods and services of potential interest to you. The information collected
            through this process does not enable us or them to identify your name, contact details, or other details
            that directly identify you unless you choose to provide these.
          </div>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">How often will you update this Cookie Policy?</h2>
          </div>
          <div>
            We may update&nbsp;this Cookie Policy from time to time in order to reflect, for example, changes to the
            cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie
            Policy regularly to stay informed about our use of cookies and related technologies.
          </div>
          <div className="mt-2">The date at the top of this Cookie Policy indicates when it was last updated.</div>
          <div>
            <h2 className="mb-1 mt-6 text-2xl font-semibold">Where can I get further information?</h2>
          </div>
          <div>
            If you have any questions about our use of cookies or other technologies, please contact us at:{' '}
            <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
              support@kreatli.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
