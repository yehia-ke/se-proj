// companyData.js
import { GridColDef } from '@mui/x-data-grid';

// Column definitions for company data
export const companyColumns: GridColDef[] = [
  { field: 'name', headerName: 'Company Name', width: 250, sortable: true },
  { field: 'size', headerName: 'Size', width: 150, sortable: true },
  { field: 'industry', headerName: 'Industry', width: 200, sortable: true },
  { field: 'email', headerName: 'Email', width: 250, sortable: true },
];

// Company data
export const companies = [
  {
    id: 1,
    name: 'Oracle Corporation',
    size: '1000+ employees',
    industry: 'Enterprise Software',
    email: 'recruiting@oracle.com',
    description: 'Oracle Corporation is an American multinational computer technology corporation headquartered in Austin, Texas.',
    location: 'Austin, TX',
    website: 'www.oracle.com',
    contactPerson: 'James Rodriguez',
    phoneNumber: '+1 (650) 555-1234'
  },
  {
    id: 2,
    name: 'Microsoft',
    size: '1000+ employees',
    industry: 'Technology',
    email: 'careers@microsoft.com',
    description: 'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.',
    location: 'Redmond, WA',
    website: 'www.microsoft.com',
    contactPerson: 'Emily Chen',
    phoneNumber: '+1 (425) 555-2345'
  },
  {
    id: 3,
    name: 'Accenture',
    size: '1000+ employees',
    industry: 'Consulting',
    email: 'talent@accenture.com',
    description: 'Accenture plc is an Irish-American professional services company based in Dublin, specializing in information technology services and consulting.',
    location: 'Dublin, Ireland',
    website: 'www.accenture.com',
    contactPerson: 'Sarah O\'Connor',
    phoneNumber: '+353 1 555 3456'
  },
  {
    id: 4,
    name: 'Google',
    size: '1000+ employees',
    industry: 'Technology',
    email: 'careers@google.com',
    description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products.',
    location: 'Mountain View, CA',
    website: 'www.google.com',
    contactPerson: 'David Kim',
    phoneNumber: '+1 (650) 555-4567'
  },
  {
    id: 5,
    name: 'Amazon',
    size: '1000+ employees',
    industry: 'E-commerce',
    email: 'recruiting@amazon.com',
    description: 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    location: 'Seattle, WA',
    website: 'www.amazon.com',
    contactPerson: 'Jessica Taylor',
    phoneNumber: '+1 (206) 555-5678'
  },
  {
    id: 6,
    name: 'IBM',
    size: '1000+ employees',
    industry: 'Technology',
    email: 'careers@ibm.com',
    description: 'International Business Machines Corporation is an American multinational technology corporation headquartered in Armonk, New York.',
    location: 'Armonk, NY',
    website: 'www.ibm.com',
    contactPerson: 'Robert Johnson',
    phoneNumber: '+1 (914) 555-6789'
  },
  {
    id: 7,
    name: 'Meta',
    size: '1000+ employees',
    industry: 'Social Media',
    email: 'talent@meta.com',
    description: 'Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate.',
    location: 'Menlo Park, CA',
    website: 'www.meta.com',
    contactPerson: 'Linda Martinez',
    phoneNumber: '+1 (650) 555-7890'
  },
  {
    id: 8,
    name: 'Deloitte',
    size: '1000+ employees',
    industry: 'Consulting',
    email: 'careers@deloitte.com',
    description: 'Deloitte Touche Tohmatsu Limited is a British multinational professional services network.',
    location: 'London, UK',
    website: 'www.deloitte.com',
    contactPerson: 'Thomas Wilson',
    phoneNumber: '+44 20 555 8901'
  },
  {
    id: 9,
    name: 'Apple',
    size: '1000+ employees',
    industry: 'Consumer Electronics',
    email: 'jobs@apple.com',
    description: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services.',
    location: 'Cupertino, CA',
    website: 'www.apple.com',
    contactPerson: 'Jennifer Lee',
    phoneNumber: '+1 (408) 555-9012'
  },
  {
    id: 10,
    name: 'Goldman Sachs',
    size: '1000+ employees',
    industry: 'Finance',
    email: 'recruiting@gs.com',
    description: 'The Goldman Sachs Group, Inc. is an American multinational investment bank and financial services company.',
    location: 'New York, NY',
    website: 'www.goldmansachs.com',
    contactPerson: 'Michael Brown',
    phoneNumber: '+1 (212) 555-0123'
  }
];