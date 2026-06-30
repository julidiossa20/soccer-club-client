declare module '*.module.css' {
  const classes: Record<string, string>;
  // const classes: { [key: string]: string };
  export default classes;
}
