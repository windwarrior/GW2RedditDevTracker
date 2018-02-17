export function thingToContent (thing) {
    if (thing.kind === "t1") {
        // "T1" childs are comments                        
        return {
            type: "comment",
            id: thing.data.name,
            last_updated: new Date(),
            parent_content: {
                id: thing.data.parent_id,
                last_updated: null
            },
            post_meta: {
                title: thing.data.link_title,
                subreddit: thing.data.subreddit,
                perma: thing.data.link_url,
                author: thing.data.link_author           
            },
            meta: {
                author: thing.data.author,
                subreddit: thing.data.subreddit,
                // Reddit counts seconds, JS counts milliseconds
                date: new Date(thing.data.created_utc * 1000).toString(),
                score: thing.data.score,
                perma: thing.data.permalink
            },
            body: thing.data.body
        }

    } else if (thing.kind === "t3") {
        // "T3" childs are either self posts or links
        let meta = {
            title: thing.data.title,
            subreddit: thing.data.subreddit,
            date: new Date(thing.data.created_utc * 1000).toString(),
            perma: thing.data.permalink,
            author: thing.data.author
        }

        let body;

        if (thing.data.is_self) {
            body = thing.data.selftext;
        } else {
            body = thing.data.url;
        }

        return {
            // TODO: distinguish links/text-posts?
            type: "text-post",
            id: thing.data.name,
            last_updated: new Date(),
            meta,
            body
        }
    }
}