/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

export interface AchievementData {
  id: string
  isNew: boolean
  title: string
  type: string | null
  criteria: string | null
  issuer: {
    name: string
    url?: string
    iconUrl?: string
  }
  issuedOn: string
  expiresOn: string | null
  imageUrl: string | null
  skills: SkillData[]
  verifiedBy: string | null
}

// ----------------- portfolios -----------------
export interface PortfolioData {
  id: string
  title: string
  heroImageUrl: string | null
}

export interface PortfolioDetailData extends PortfolioData {
  blurb: string
  city: string
  state: string
  phone: string
  email: string
  about: string
  skills: SkillData[]
  links: string[]
  education: EducationData[]
  experience: ExperienceData[]
  projects: ProjectDetailData[]
  achievements: AchievementData[]
}

export interface SkillData {
  name: string
  verified: boolean
  url?: string
}

export interface EducationData {
  id: string
  title: string
  institution: string
  city: string
  state: string
  from_date: string
  to_date: string
  gpa: string
}

export interface ExperienceData {
  id: string
  where: string
  title: string
  from_date: string
  to_date: string
  description: string
}

export interface PortfolioEditData {
  portfolio: PortfolioDetailData
  achievements: AchievementData[]
  projects: ProjectData[]
}

// ----------------- projects -----------------
export interface ProjectData {
  id: string
  title: string
  heroImageUrl: string | null
  skills: SkillData[]
  attachments: AttachmentData[]
  achievements: AchievementData[]
}

export interface AttachmentData {
  id: string
  filename: string
  display_name: string
  size: string | number
  contentType: string
  url: string
}

export interface ProjectDetailData extends ProjectData {
  description: string
  links: string[]
}

export interface ProjectEditData {
  project: ProjectDetailData
  achievements: AchievementData[]
}

// ---------- pathways ----------

export type MilestoneId = string

export type PathwayBadgeType = {
  id: string
  title: string
  issuer: {
    name: string
    url: string
  }
  type: string
  criteria: string
  skills: string[]
}

export type RequirementType =
  | 'assessment'
  | 'assignment'
  | 'course'
  | 'module'
  | 'earned_achievement'
  | 'experience'
  | 'project'

export type RequirementTypesType = {
  [Key in RequirementType]: string
}

export const RequirementTypes: RequirementTypesType = {
  assessment: 'Assessment',
  assignment: 'Assignment',
  course: 'Course',
  module: 'Module',
  earned_achievement: 'Achievement',
  experience: 'Experience',
  project: 'Project',
}

export interface RequirementData {
  id: string
  name: string
  description: string
  required?: boolean
  type: RequirementType
}

// this is a node in the pathway tree
export interface MilestoneData {
  id: MilestoneId
  title: string
  description: string
  required?: boolean
  requirements: RequirementData[]
  achievements: AchievementData[]
  next_milestones: MilestoneId[] // ids of this milestone's children
}

// this is the root of the pathway tree
export interface PathwayData {
  id: string
  title: string
  milestoneCount: number
  requirementCount: number
  published?: string // iso8601 date
  enrolled_student_count: number
  started_count: number
  completed_count: number
}

export interface PathwayDetailData extends PathwayData {
  description: string
  is_private?: boolean
  learning_outcomes: SkillData[]
  completion_award: PathwayBadgeType | null
  first_milestones: MilestoneId[] // ids of the milestone children of the root pathway
  milestones: MilestoneData[] // all the milestones in the pathway
}

export interface PathwayEditData {
  pathway: PathwayDetailData
  badges: PathwayBadgeType[]
}
