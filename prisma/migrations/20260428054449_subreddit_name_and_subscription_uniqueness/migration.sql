/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `subreddit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subreddit_id,user_id]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subreddit_name_key" ON "subreddit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_subreddit_id_user_id_key" ON "subscription"("subreddit_id", "user_id");
