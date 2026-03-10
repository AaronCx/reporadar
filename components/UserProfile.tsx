"use client";

import { useState, useMemo } from "react";
import { GitHubUser, GitHubRepo } from "@/lib/github";
import ProfileHeader from "@/components/ProfileHeader";
import LanguageBreakdown from "@/components/LanguageBreakdown";
import RepoHighlights from "@/components/RepoHighlights";
import ActivityStats from "@/components/ActivityStats";
import ContributionPatterns from "@/components/ContributionPatterns";
import DateRangeFilter from "@/components/DateRangeFilter";

interface UserProfileProps {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export default function UserProfile({ user, repos }: UserProfileProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterField, setFilterField] = useState<"created_at" | "updated_at">(
    "created_at"
  );

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const dateValue = new Date(repo[filterField]).getTime();
      if (fromDate) {
        const from = new Date(fromDate).getTime();
        if (dateValue < from) return false;
      }
      if (toDate) {
        // Include the entire "to" day
        const to = new Date(toDate).getTime() + 86400000 - 1;
        if (dateValue > to) return false;
      }
      return true;
    });
  }, [repos, fromDate, toDate, filterField]);

  const hasFilter = fromDate || toDate;

  return (
    <>
      <ProfileHeader user={user} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {hasFilter && (
            <span className="text-sm text-[var(--text-dim)]">
              Showing {filteredRepos.length} of {repos.length} repos
            </span>
          )}
        </div>
        <DateRangeFilter
          fromDate={fromDate}
          toDate={toDate}
          filterField={filterField}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onFilterFieldChange={setFilterField}
        />
      </div>

      <ActivityStats user={user} repos={filteredRepos} />
      <LanguageBreakdown repos={filteredRepos} />
      <RepoHighlights repos={filteredRepos} />
      <ContributionPatterns repos={filteredRepos} />
    </>
  );
}
