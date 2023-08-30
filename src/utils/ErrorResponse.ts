class ErrorResponse extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string | string[], statusCode: number) {
    // Construct a single string from the array of messages if needed
    const formattedMessage = Array.isArray(message)
      ? message.join(" ")
      : message;

    super(formattedMessage);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorResponse);
    }
  }
}

export default ErrorResponse;
