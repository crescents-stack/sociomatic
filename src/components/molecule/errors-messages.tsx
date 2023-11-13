const ErrorMessages = ({ errors, name }: { errors: any; name: string }) => {
  //   console.log(errors.name);
  return errors[`${name}`] ? (
    <div className="mb-3 text-pink-600">{errors[`${name}`]}</div>
  ) : null;
};

export default ErrorMessages;
