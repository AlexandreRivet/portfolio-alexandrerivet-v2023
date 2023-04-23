"use client"
import { Fragment } from "react";
import StageView from "./stage";

export default function WebGLSwitcher(
  {
    children,
    lang,
  }: {
    children: React.ReactNode,
    lang: string
  }
) {
  const isWebGLSupported = true;

  if (isWebGLSupported) {
    return (
      <Fragment>
        <StageView lang={lang}/>
        {children}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {children}
    </Fragment>
  )

}