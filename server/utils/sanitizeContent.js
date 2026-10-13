const sanitizeHtml = require("sanitize-html");

const sanitizeContent = (dirty) =>
  sanitizeHtml(dirty, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "s",
      "h1",
      "h2",
      "h3",
      "blockquote",
      "hr",
    ],
    allowedAttributes: {},
  });

module.exports = sanitizeContent;
