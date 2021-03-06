import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './toast';

import { Container } from './styles';

export default ({ messages }) => {
    const messagesWithTransitions = useTransition(
        messages,
        message => message.id,
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 },
        },
    );

    return (
        <Container>
            {messagesWithTransitions.map(({ item, key, props }) => {
                return <Toast key={key} message={item} style={props} />;
            })}
        </Container>
    );
};
