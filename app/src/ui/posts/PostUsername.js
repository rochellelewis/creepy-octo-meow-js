import React from 'react';
import {useSelector} from "react-redux";

/**
 * Output post author profileUsername.
**/
export const PostUsername = ({profileId}) => {

	const profile = useSelector((state) => {
		return state.profiles ? state.profiles.find(profile => profileId === profile.profileId) : null
	});

	return (
		<>
			{profile ? profile.profileUsername : "???"}
		</>
	);

};