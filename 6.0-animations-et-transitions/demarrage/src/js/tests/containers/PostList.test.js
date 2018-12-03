jest.mock('config', () => {
    return {
        basePath: '/',
        baseUrl: 'http://localhost/',
        apiUrl: 'http://localhost/api/',
        picturesUrl: 'http://localhost/uploads/pictures/',
    };
}, { virtual: true });

import React from 'react';
import renderer from "react-test-renderer";
import { PostList } from '../../containers/PostList';
import { MemoryRouter } from 'react-router';

describe( 'PostList', function() {
    it( 'should render correctly', function() {
        const tree1 = renderer
            .create(
                <MemoryRouter>
                    <PostList dispatch={() => {}} posts={{ data: [], isLoading: true, error: null }} />
                </MemoryRouter>
                )
            .toJSON();
        expect(tree1).toMatchSnapshot();

        const tree2 = renderer
            .create(
                <MemoryRouter>
                    <PostList dispatch={() => {}} posts={{ data: [], isLoading: false, error: { message: 'An error occured' } }} />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree2).toMatchSnapshot();  

        const tree3 = renderer
            .create(
                <MemoryRouter>
                    <PostList dispatch={() => {}} posts={{ data: [
                    {
                        id: 42,
                        picture: 'picture1.jpg',
                        createdAt: '2018-11-27T17:27:01+00:00',                    
                    },
                    {
                        id: 72,
                        picture: 'picture2.jpg',
                        createdAt: '2018-11-28T16:21:01+00:00',
                    },
                    {
                        id: 94,
                        picture: 'picture3.jpg',
                        createdAt: '2018-11-29T19:32:01+00:00',
                    }
                ], isLoading: false, error: null }} />
            </MemoryRouter>
            )
            .toJSON();
        expect(tree3).toMatchSnapshot();  
    } )
} )