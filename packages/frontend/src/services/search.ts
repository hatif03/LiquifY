import CreateJobForm from '@components/form/CreateJobForm';
import { privateApi, publicApi } from '../front-provider/src';
import { CreateJob, User, Job, CreateJob1 } from '../utility/src';
import { assertEquals } from 'typia';

export interface GetRecentFreelancersProps {
  limit: number;
}

export interface GetRecentJobsProps {
  limit: number;
}

export interface SearchJobsProps {
  limit: number;
  page: number;
  searchTerm?: string;
}

export interface SearchJobProps {
  limit: number;
  page: number;
  searchTerm?: string;
  json: string;
}

export interface SearchFreelancersProps {
  limit: number;
  page: number;
  searchTerm?: string;
}

export type GetRecentFreelancers = (props: GetRecentFreelancersProps) => Promise<User[]>;

export type SearchFreelancers = (
  props: SearchFreelancersProps
) => Promise<{ users: User[]; maxPage: number; totalResult: number }>;

export type SearchJobs = (
  props: SearchJobsProps
) => Promise<{ jobs: CreateJob1[]; maxPage: number; totalResult: number }>;

export type SearchJob = (
  props: SearchJobProps
) => Promise<{ jobs: CreateJob[]; maxPage: number; totalResult: number }>;

export type GetRecentJobs1 = (props: GetRecentJobsProps) => Promise<CreateJob1[]>;

export type GetRecentJobs = (props: GetRecentJobsProps) => Promise<CreateJob[]>;

export const getRecentFreelancers: GetRecentFreelancers = async ({ limit }) => {
  const res = await publicApi.get(`/user/recentFreelancer/${limit}`);
  return res.data;
};

export const getRecentJobs: GetRecentJobs = async ({ limit }) => {
  const res = await publicApi.get(`/jobs/recent/1/${limit}`);
  return res.data.jobs;
};

export const getRecentJobs1: GetRecentJobs1 = async ({ limit }) => {
  const res = await publicApi.get(`/jobs/recent/1/${limit}`);
  return res.data.jobs1;
};

export const convertJsonToArray: SearchJob = async ({ json }) => {
  const list_jobs = JSON.parse(json);
  const data = list_jobs.Ok;
  const jobs = assertEquals<CreateJob[]>(data);
  console.log(data)
  return { jobs: jobs, maxPage: 1, totalResult: 1 };
}

export const searchFreelancers: SearchFreelancers = async ({ limit, page, searchTerm }) => {
  let query = `/user/searchFreelancer/${page}/${limit}`;
  if (searchTerm) {
    query = `${query}?searchTerm=${searchTerm}`;
  }
  const res = await publicApi.get(query);
  return res.data;
};

export const searchJobs: SearchJobs = async ({ limit, page, searchTerm }) => {
  let query = `/jobs/search/${page}/${limit}`;
  if (searchTerm) {
    query = `${query}?searchTerm=${searchTerm}`;
  }
  const res = await publicApi.get(query);
  return res.data;
};

export const searchFreelancersLogged: SearchFreelancers = async ({ limit, page, searchTerm }) => {
  let query = `/user/searchFreelancerLogged/${page}/${limit}`;
  if (searchTerm) {
    query = `${query}?searchTerm=${searchTerm}`;
  }
  const res = await privateApi.get(query);
  return res.data;
};
