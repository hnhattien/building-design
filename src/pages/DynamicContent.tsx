import React, { ComponentProps, FunctionComponent } from 'react';

const DynamicContent: FunctionComponent<ComponentProps<'div'>> = (props) => {
    return <div className="wrapper">{props.children}</div>;
};

export default DynamicContent;
