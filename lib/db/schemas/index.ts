export { default as UserTable, userTableRelations } from "./user.schema";
export { default as BookTable, bookTableRelations } from "./book.schema";
export {
  default as UserBooksTable,
  userBooksTableRelations,
} from "./user-books.schema";
export {
  default as bookCategoryTable,
  bookCategoryRelations,
} from "./book-category.schema";
export { default as authorTable, authorTableRelations } from "./author.schema";
export {
  default as authorBookMappingTable,
  authorBookMappingTableRelations,
} from "./author-book-mapping.schema";
export {
  default as bookCategoryMappingTable,
  bookCategoryMappingRelations,
} from "./book-category-mapping.schema";
export {
  default as userSavedBooksTable,
  userSavedBooksRelations,
} from "./user-saved-books.schema";
export {
  default as userLikedBooksTable,
  userLikedBooksRelations,
} from "./user-liked-books.schema";

export {
  default as userHaveToReadBooksTable,
  userHaveToReadBooksRelations,
} from "./user-have-to-read-books.schema";

export {
  default as userCurrentlyReadingBooksTable,
  userCurrentlyReadingBooksReations,
} from "./user-currently-reading-books.schema";

export {
  default as VerificationTokenTable,
  verificationTokenTableRelations,
} from "./verification-token.schema";
