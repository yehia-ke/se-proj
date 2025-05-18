import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Divider,
  TextField,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  Edit,
  Save,
  Add,
  Delete,
  School,
  Work,
} from "@mui/icons-material";

const majors = [
  { id: 1, name: "CSEN", semesters: 10 },
  { id: 2, name: "DMET", semesters: 10 },
  { id: 3, name: "IET", semesters: 10 },
  { id: 4, name: "MECH", semesters: 10 },
];

const UserProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@guc.edu.eg",
    phone: "+20 123 456 7890",
    bio: "Computer Science student passionate about web development and AI",
    jobInterests: "Frontend Development, UI/UX Design",
    major: 1,
    semester: 1,
  });

  // Experience
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      type: "internship",
      company: "TechCorp",
      position: "Frontend Developer Intern",
      duration: "June 2023 - August 2023",
      responsibilities:
        "Developed React components, fixed UI bugs, participated in code reviews",
    },
    {
      id: 2,
      type: "part-time",
      company: "Campus IT Services",
      position: "IT Support Assistant",
      duration: "September 2022 - May 2023",
      responsibilities:
        "Provided technical support to students and faculty, maintained computer labs",
    },
  ]);

  // College activities
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Hackathon 2023",
      role: "Participant",
      duration: "March 2023",
    },
    {
      id: 2,
      name: "Computer Science Club",
      role: "Treasurer",
      duration: "2022-2023",
    },
  ]);

  // Edit modes
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [newExperience, setNewExperience] = useState({
    type: "internship",
    company: "",
    position: "",
    duration: "",
    responsibilities: "",
  });
  const [newActivity, setNewActivity] = useState({
    name: "",
    role: "",
    duration: "",
  });
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    setExperiences((prev) => [...prev, { ...newExperience, id: Date.now() }]);
    setNewExperience({
      type: "internship",
      company: "",
      position: "",
      duration: "",
      responsibilities: "",
    });
    setShowAddExperience(false);
  };

  const addActivity = () => {
    setActivities((prev) => [...prev, { ...newActivity, id: Date.now() }]);
    setNewActivity({
      name: "",
      role: "",
      duration: "",
    });
    setShowAddActivity(false);
  };

  const deleteExperience = (id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter((act) => act.id !== id));
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: 4, 
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        my: 4
      }}
    >
      {/* Profile Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar sx={{ width: 100, height: 100, mr: 3 }} />
          <Box flexGrow={1}>
            <Typography variant="h4" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {profile.email}
            </Typography>
            {editBasicInfo ? (
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                {profile.phone}
              </Typography>
            )}
          </Box>
          <IconButton onClick={() => setEditBasicInfo(!editBasicInfo)}>
            {editBasicInfo ? <Save/> : <Edit />}
          </IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Bio */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            About Me
          </Typography>
          {editBasicInfo ? (
            <TextField
              fullWidth
              multiline
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
            />
          ) : (
            <Typography>{profile.bio}</Typography>
          )}
        </Box>

        {/* Major and Semester */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Academic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Select
                  value={profile.major}
                  label="Major"
                  onChange={(e) =>
                    setProfile({ ...profile, major: e.target.value })
                  }
                >
                  {majors.map((major) => (
                    <MenuItem key={major.id} value={major.id}>
                      {major.name} ({major.semesters} semesters)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select
                  value={profile.semester}
                  onChange={(e) =>
                    setProfile({ ...profile, semester: e.target.value })
                  }
                  label="Semester"
                >
                  {Array.from(
                    {
                      length:
                        majors.find((m) => m.id === profile.major)?.semesters ||
                        8,
                    },
                    (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        Semester {i + 1}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Job Interests */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Job Interests
          </Typography>
          {editBasicInfo ? (
            <TextField
              fullWidth
              multiline
              label="Job Interests"
              name="jobInterests"
              value={profile.jobInterests}
              onChange={handleProfileChange}
            />
          ) : (
            <Typography>{profile.jobInterests}</Typography>
          )}
        </Box>
      </Paper>

      {/* Experience Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5">
            <Work sx={{ verticalAlign: "middle", mr: 1 }} />
            Experience
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowAddExperience(true)}
          >
            Add Experience
          </Button>
        </Box>

        {showAddExperience && (
          <Card 
            sx={{ 
              mb: 3, 
              p: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={newExperience.type}
                    onChange={handleExperienceChange}
                    label="Type"
                  >
                    <MenuItem value="internship">Internship</MenuItem>
                    <MenuItem value="part-time">Part-time Job</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={newExperience.company}
                  onChange={handleExperienceChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position"
                  name="position"
                  value={newExperience.position}
                  onChange={handleExperienceChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  value={newExperience.duration}
                  onChange={handleExperienceChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  label="Responsibilities"
                  name="responsibilities"
                  value={newExperience.responsibilities}
                  onChange={handleExperienceChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={() => setShowAddExperience(false)}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={addExperience}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Card>
        )}

        <List>
          {experiences.map((exp) => (
            <Card 
              key={exp.id} 
              sx={{ 
                mb: 2,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6">{exp.position}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {exp.company} •{" "}
                      {exp.type === "internship" ? "Internship" : "Part-time"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {exp.duration}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {exp.responsibilities}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => deleteExperience(exp.id)}>
                    <Delete color="error" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      </Paper>

      {/* College Activities Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5">
            <School sx={{ verticalAlign: "middle", mr: 1 }} />
            College Activities
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowAddActivity(true)}
          >
            Add Activity
          </Button>
        </Box>

        {showAddActivity && (
          <Card 
            sx={{ 
              mb: 3, 
              p: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Activity Name"
                  name="name"
                  value={newActivity.name}
                  onChange={handleActivityChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Role"
                  name="role"
                  value={newActivity.role}
                  onChange={handleActivityChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  value={newActivity.duration}
                  onChange={handleActivityChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={() => setShowAddActivity(false)}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={addActivity}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Card>
        )}

        <List>
          {activities.map((act) => (
            <ListItem 
              key={act.id} 
              sx={{ 
                px: 0,
                '&:not(:last-child)': {
                  mb: 1
                }
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="h6">{act.name}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {act.role} • {act.duration}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => deleteActivity(act.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;