class ValidationErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationErrors";
  }
}
export default ValidationErrors;
