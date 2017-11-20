
// MainHeader
// ============
// Heading for the document

// Imports
import React from 'react';
import renderer from 'react-test-renderer';
import SideBar from './SideBar';

describe('SideBar renders correctly', () => {
    it('renders correctly', () => {
        const locations = {'location1' : 1, 'location2' : 2};

        const rendered = renderer.create(
            <SideBar locations={locations} />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});