export function updatePageActionsReactionsTotal(responseData: any): any {
    let totalReactions = 0;
    let endTime = "";

    // Sum up all the reaction values and find the latest end_time
    for (const item of responseData.data) {
        if (item.name.startsWith("page_actions_post_reactions_")) {
            for (const valueObj of item.values) {
                totalReactions += valueObj.value;
                endTime = valueObj.end_time;  // Assuming all reactions have the same end_time
            }
        }
    }

    // Create a new object for total reactions
    const totalReactionsData: any = {
        name: "page_actions_post_reactions_total",
        period: "total_over_range",
        values: [{
            value: totalReactions,
            end_time: endTime
        }],
        title: "Total post reactions",
        description: "Daily total post reactions of a page by type.",
        id: "105309045774240/insights/page_actions_post_reactions_total/total_over_range"
    };

    // Remove the individual reaction entries and add the total reactions entry
    responseData.data = responseData.data.filter((item:any) => !item.name.startsWith("page_actions_post_reactions_"));
    responseData.data.push(totalReactionsData);

    return responseData;
}