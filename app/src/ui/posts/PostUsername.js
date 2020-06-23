import React from 'react';
import {useSelector} from "react-redux";

export const PostUsername = ({profileId}) => {

	/* pull this punctionality up one level to parent component???*/
	const profile = useSelector((state) => {
		return state.profiles ? state.profiles.find(profile => profileId === profile.profileId) : null
	});

	console.log(profile)

	return (
		<>
			{profile ? profile.profileUsername : "???"}
		</>
	);

};