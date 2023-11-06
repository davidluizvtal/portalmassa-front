import logoImg from '../../assets/vtal-logo.png';

export function Logo() {
  return (
    <img
      src={logoImg}
      alt=""
      className="w-auto h-12 md:h-16 mx-auto p-4 object-cover"
    />
  );
}
