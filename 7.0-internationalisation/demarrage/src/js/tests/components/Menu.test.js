import React from 'react';
import renderer from "react-test-renderer";
import Menu from '../../components/Menu';
import { MemoryRouter } from 'react-router';

describe( 'Menu', function() {
    it( 'should render correctly', function() {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <Menu />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();        
    } )
} )