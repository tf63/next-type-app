import { AlgorithmCodeAPIRequest, AlgorithmCodeAPIResponse } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const requestBody: AlgorithmCodeAPIRequest = req.body
    console.log(requestBody)

    const code: AlgorithmCodeAPIResponse = {
        id: 1,
        nrow: 43,
        language_id: 8,
        algorithm_id: 13,
        content:
            '<?php\n\nclass Queue {\n    protected $queue;\n\n    public function __construct() {\n        $this->queue = [];\n    }\n\n    public function isEmpty() {\n        return empty($this->queue);\n    }\n\n    public function enqueue($item) {\n        array_push($this->queue, $item);\n    }\n\n    public function dequeue() {\n        if (!$this->isEmpty()) {\n            return array_shift($this->queue);\n        }\n        return null;\n    }\n\n    public function size() {\n        return count($this->queue);\n    }\n}\n\n// Example usage\n$queue = new Queue();\n$queue->enqueue("John");\n$queue->enqueue("Jane");\n$queue->enqueue("Bob");\n\necho "Queue size: " . $queue->size() . "\\n";\necho "Dequeued item: " . $queue->dequeue() . "\\n";\necho "Queue size after dequeue: " . $queue->size() . "\\n";\n\n?>'
    }

    res.status(200).json(code)
}
