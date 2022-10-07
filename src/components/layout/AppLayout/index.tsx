import React, { FC, ReactNode } from 'react'

export type AppLayoutProps = {
  children?: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return <div>{children}</div>
}
