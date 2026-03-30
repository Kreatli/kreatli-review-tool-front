import { Icon } from '../../various/Icon';

export const Socials = () => {
  return (
    <div className="flex gap-3">
      <a href="https://www.linkedin.com/company/kreatli" target="_blank">
        <Icon icon="linkedin" size={24} />
      </a>
      <a href="https://x.com/kreatli" target="_blank">
        <Icon icon="x" size={24} />
      </a>
      <a href="https://www.facebook.com/people/Kreatli/61581649865831" target="_blank">
        <Icon icon="facebook" size={24} />
      </a>
      <a href="https://www.youtube.com/@kreatli" target="_blank">
        <Icon icon="youtube" size={24} />
      </a>
    </div>
  );
};
