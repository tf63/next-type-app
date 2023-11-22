import { LanguageCodeAPIRequest, LanguageCodeAPIResponse } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const requestBody: LanguageCodeAPIRequest = req.body
    console.log(requestBody)

    const code: LanguageCodeAPIResponse = {
        nrow: 17,
        language_id: 3,
        content:
            'class Calculator {\n  add(a: number, b: number): number {\n    return a + b;\n  }\n}\n\ndescribe("Calculator", () => {\n  let calculator: Calculator;\n\n  beforeEach(() => {\n    calculator = new Calculator();\n  });\n\n  it("should add two numbers correctly", () => {\n    expect(calculator.add(2, 3)).toEqual(5);\n  });\n});'
    }

    res.status(200).json(code)
}
