declare module '*.svg' {
  import * as React from 'react';

  // React Component로 쓰는 경우
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  // src (string) 로 쓰는 경우
  const src: string;
  export default src;
}
