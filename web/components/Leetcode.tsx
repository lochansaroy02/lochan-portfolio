import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
const Leetcode = () => {



    const src = `![LeetCode Stats](https://leetcard.jacoblin.cool/lochansaroy14?theme=dark&font=Noto%20Sans%20Tai%20Le&ext=heatmap)`;

    return (
        <div>
            {/* Pass 'source' as a child instead of a prop */}
            <ReactMarkdown remarkPlugins={[gfm]}>
                {src}
            </ReactMarkdown>
        </div>
    )
}

export default Leetcode