import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
const GithubMap = ({ src }: {
    src?: string
}) => {
    let source;
    const statsSrc = `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=lochansaroy02&theme=dark&show_icons=true&hide_border=true&count_private=true)`;

    const langSrc = `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=lochansaroy02&layout=compact&theme=dark&hide_border=true)`;

    const streakSrc = `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=lochansaroy02&theme=dark&hide_border=true)`;
    const heatmapSrc = `![GitHub Heatmap](https://ghchart.rshah.org/409ba5/lochansaroy02)`;
    if (src === "stats") {
        source = statsSrc
    } else if (src == 'lang') {
        source = langSrc
    } else if (src == 'streak') {
        source = streakSrc
    } else {
        source = heatmapSrc;
    }





    // Combine them or choose one



    return (
        <div>

            <div>
                {/* Pass 'source' as a child instead of a prop */}
                <ReactMarkdown remarkPlugins={[gfm]}>
                    {source}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default GithubMap