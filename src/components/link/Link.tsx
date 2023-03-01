import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as DsReactLink } from '@navikt/ds-react';

type Props = {
    href: string;
    external?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const Link = ({ href, external, children, ...rest }: Props) => {
    const linkProps = external ? { href } : { as: ReactRouterLink, to: href };

    return (
        <DsReactLink {...rest} {...linkProps}>
            {children}
        </DsReactLink>
    );
};
