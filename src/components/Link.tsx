import React from 'react'
import { useRouter } from 'next/router'
import LinkNext, { LinkProps } from 'next/link'

interface Props extends LinkProps {
  activeClassName?: string;
  children: any;
}

export const Link = ({ href, children, activeClassName = 'active', ...props }: Props) => {
  const router = useRouter();
  const child = React.Children.only(children);
  const childClassName = child.props.className || "";
  const className = `${childClassName} ${activeClassName}`.trim();

  return (
    <LinkNext
      href={href}
      {...props}
    >
      {router.pathname === href ? React.cloneElement(children, {
        className: className || null,
      }) : children}
    </LinkNext>
  )
}