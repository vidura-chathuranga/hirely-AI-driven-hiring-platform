class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.message = "ForbiddenError";
  }
}
export default ForbiddenError;
