declare module '*.svg' {
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
