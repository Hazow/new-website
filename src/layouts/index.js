import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';

import favicon from '../../static/favicon/favicon-16x16.png';
import FooterContent from '../components/Footer';
import HeaderContent from '../components/Header';
import theme from '../utils/theme';
import Logo from '../components/Logo';

const Container = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 5rem 1fr auto;
    grid-template-areas:
        'h h h h h h h h h h h h'
        '. . c c c c c c c c . .'
        'f f f f f f f f f f f f';
    @media (max-width: 799px) {
        display: none;
    }
`;
const NotReady = styled.div`
    display: none;
    @media (max-width: 799px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
    }
`;
const Header = styled.header`
    grid-area: h;
    z-index: 9;
    position: 1;
`;

const Content = styled.section`
    grid-area: c;
    z-index: 8;
    position: 2;
    padding: 3rem 0;
`;
const Footer = styled.footer`
    grid-area: f;
    position: 3;
`;

class TemplateWrapper extends Component {
    render() {
        const { children, data } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <NotReady>
                        <Logo />
                        <span>
                            Toutes nos excuses, le site n'est pas encore prêt
                            pour cette résolution d'écran :(
                        </span>
                    </NotReady>
                    <Container>
                        <Helmet>
                            <link
                                rel="icon"
                                href={favicon}
                                type="image/x-icon"
                            />
                        </Helmet>
                        <Header>
                            <HeaderContent />
                        </Header>
                        <Content>
                            {children({
                                ...this.props,
                                nextMeetup: data.nextMeetup || null,
                            })}
                        </Content>
                        <Footer>
                            <FooterContent
                                socialLinks={data.site.siteMetadata.socialLinks}
                            />
                        </Footer>
                    </Container>
                </div>
            </ThemeProvider>
        );
    }
}

TemplateWrapper.propTypes = {
    children: PropTypes.func,
};

export const query = graphql`
    query AboutQuery {
        site {
            siteMetadata {
                title
                baseline
                socialLinks {
                    title
                    url
                }
            }
        }
        nextMeetup: allMeetupEvent(
            limit: 1
            filter: { status: { eq: "upcoming" } }
        ) {
            edges {
                node {
                    name
                    link
                    yes_rsvp_count
                }
            }
        }
    }
`;

export default TemplateWrapper;
