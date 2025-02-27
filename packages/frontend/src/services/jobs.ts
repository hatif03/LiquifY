import { privateApi } from '../front-provider/src/api';
import { CreateJob, CreateJob1 } from '../utility/src';

export type CreateNewJob = (job: Partial<CreateJob1>) => Promise<CreateJob1>;

export type GetMyJobs = () => Promise<CreateJob1[]>;

export interface DeleteJobProps {
  id: string;
  reason: string;
}

export type DeleteJob = (args: DeleteJobProps) => Promise<boolean>;

export type GetJobByUUID = (id: string) => Promise<CreateJob1>;

export const createJob: CreateNewJob = async (job) => {
  const res = await privateApi.post('/jobs/create', { ...job });
  return res.data;
};

export const getMyJobs: GetMyJobs = async () => {
  const res = await privateApi.get('/jobs/my');
  return res.data;
};

export const deleteJob: DeleteJob = async ({ id, reason }) => {
  const res = await privateApi.delete('/jobs/delete', { data: { id, reason } });
  return res.data;
};

export const getJobByUUID: GetJobByUUID = async (id) => {
  const res = await privateApi.get(`/jobs/${id}`);
  return res.data;
};
