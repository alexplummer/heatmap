
// MainHeader
// ============
// Heading for the document

// Imports
import React from 'react';
import renderer from 'react-test-renderer';
import VisitTable from './VisitTable';

describe('VisitTable renders correctly', () => {
    it('renders correctly', () => {
        const winner = ['location1',1];
        const locations = { 'location1': 1, 'location2': 2 };

        const rendered = renderer.create(
            <VisitTable winner={winner} locations={locations} />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});