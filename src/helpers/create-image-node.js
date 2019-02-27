export default imageFile => {
  const imageNode = document.createElement('img');
  imageNode.src = URL.createObjectURL(imageFile);
  return imageNode;
};
