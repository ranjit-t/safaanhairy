export function transformBlogObject(inputObj) {
  // Extract the user ID, title, and content
  const { ID, Title, Content } = inputObj;

  // Extract the text content and split it into paragraphs
  const paragraphs = Content.split(/\n+/).map((paragraph) => {
    // Remove HTML tags and extra whitespace
    return paragraph.replace(/<\/?[^>]+(>|$)/g, "").trim();
  });

  // Remove empty elements from the paragraphs array
  const filteredParagraphs = paragraphs.filter((paragraph) => paragraph !== "");

  // Extract the image URL if it exists
  const imageMatch = Content.match(/<img src="([^"]+)"/);
  const imageURL = imageMatch ? imageMatch[1] : null;

  // Extract the video URL if it exists
  const videoMatch = Content.match(/<iframe src="([^"]+)"/);
  const videoURL = videoMatch ? videoMatch[1] : null;

  // Create and return the transformed object
  const transformedObj = {
    userID: ID,
    title: Title,
    content: filteredParagraphs,
    imageURL: imageURL,
    videoURL: videoURL,
  };

  return transformedObj;
}
