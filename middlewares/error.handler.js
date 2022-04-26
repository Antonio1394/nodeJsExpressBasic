function logErrors (err, req, res, next){
  console.log('logError');
  console.error(err);
  next(err);//se sabe que es un mdl de tipo error.
}

function errorHandler(err, req, res, next){
  console.log('errorHandler');
  res.status(500).json({
    message:err.message,
    stack:err.stack//saber donde ocurrio el error
  });
}

function bomErrorHandler(err, req, res, next){
  if (err.isBoom) {
    const { output }= err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports={logErrors,errorHandler,bomErrorHandler};
