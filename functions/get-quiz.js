const connection = require("serverless-mysql")({
  config: {
    host: "remotemysql.com",
    database: "hDJ7aQHQ1t",
    user: "hDJ7aQHQ1t",
    password: "3XNoYKdivk",
  },
})

exports.handler = async function (event) {
  const { quizId } = JSON.parse(event.body)
  let quizDetails
  try {
    await connection.connect()
    quizDetails = await getQuizDetail(connection, quizId)
    await connection.end()
  } catch (e) {
    console.log(`User not logged in due to error= ${e}`)
  } finally {
    if (connection) {
      await connection.end()
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "0",
      quizDetails: quizDetails,
    }),
  }
}

async function getQuizDetail(connection, quizId) {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: "SELECT * FROM `quizs` WHERE `id` = ?",
        timeout: 10000,
        values: [quizId],
      },
      function (error, results, fields) {
        if (error) reject(err)
        resolve(results)
      }
    )
  })
}