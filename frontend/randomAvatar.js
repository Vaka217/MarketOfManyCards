const RandomAvatarUploader = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const avatarUrl = `https://boringavatars.com/avatars/beam/${randomColor}?size=200&name=user`;

    return avatarUri;
}

export default RandomAvatarUploader;
