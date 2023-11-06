export function toCapitalize(str: string) {
  const titleCase = str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return titleCase;
}
