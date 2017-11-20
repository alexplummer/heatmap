
// MainHeader
// ============
// Heading for the document

// Imports
import React from 'react';
import renderer from 'react-test-renderer';
import MainHeader from './MainHeader';

describe('MainHeader renders correctly', () => {
    it('renders correctly', () => {
        const rendered = renderer.create(
            <MainHeader />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});