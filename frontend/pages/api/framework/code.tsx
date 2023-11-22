import { FrameworkCodeAPIRequest, FrameworkCodeAPIResponse } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const requestBody: FrameworkCodeAPIRequest = req.body
    console.log(requestBody)

    const code: FrameworkCodeAPIResponse = {
        nrow: 11,
        tool_id: 215,
        content:
            "import React from 'react';\n\nconst App = () => {\n  return (\n    <div>\n      <h1>Hello, Julia</h1>\n    </div>\n  );\n};\n\nexport default App;"
    }

    res.status(200).json(code)
}
