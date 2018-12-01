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
import { PostDetail } from '../../containers/PostDetail';

describe( 'PostDetail', function() {
    it( 'should render correctly', function() {
        const tree1 = renderer
            .create(<PostDetail dispatch={() => {}} match={{ params: { id: 42 } }} post={{ data: null, isLoading: true, error: null }} />)
            .toJSON();
        expect(tree1).toMatchSnapshot();

        const tree2 = renderer
            .create(<PostDetail dispatch={() => {}} match={{ params: { id: 42 } }} post={{ data: null, isLoading: false, error: { message: 'An error occured' } }} />)
            .toJSON();
        expect(tree2).toMatchSnapshot();  

        const tree3 = renderer
            .create(<PostDetail dispatch={() => {}} match={{ params: { id: 42 } }} post={{ data: {
                id: 42,
                picture: 'picture.jpg',
                description: 'My picture #cool',
                createdAt: '2018-11-28T16:21:01+00:00',
                comments: [ { id: 1, content: 'Great post !', nickname: 'John', createdAt: '2018-11-28T16:21:01+00:00'} ]
            }, isLoading: false, error: null }} />)
            .toJSON();
        expect(tree3).toMatchSnapshot();  
    } )
} )